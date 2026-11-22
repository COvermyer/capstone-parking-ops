/**
 * Author: Caleb Overmyer
 * Filename: mysql.connector.ts
 * Created: 07/06/2026
 */
import { createPool, Pool, PoolConnection } from 'mysql';
let pool: Pool | null = null;

export interface QueryExecutor {
    query(
        query: string,
        params: string[] | Object,
        callback: (error: Error | null, results: any) => void
    ): void;
}

export type QueryParams = any[] | Record<string, any>;

/**
 * Initializes a pool of mySql connections for use by the API
 */
const initializeMySqlConnector = () => {
    try {
        pool = createPool({
            connectionLimit:
                parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT != undefined ? process.env.MY_SQL_DB_CONNECTION_LIMIT : ""),
            port:
                parseInt(process.env.MY_SQL_DB_PORT != undefined ? process.env.MY_SQL_DB_PORT : ""),
            host: process.env.MY_SQL_DB_HOST,
            user: process.env.MY_SQL_DB_USER,
            password: process.env.MY_SQL_DB_PASSWORD,
            database: process.env.MY_SQL_DB_DATABASE,
        });

        console.log('[mysql.connector][initializeMySqlConnector][Success] MySQL Adapter Pool generated successfully');
        console.log('[mysql.connector][initializeMySqlConnector][Info] process.env.MY_SQL_DB_DATABASE: ', process.env.MY_SQL_DB_DATABASE);

        pool.getConnection((err, connection) => {
            if (err) {
                console.log('[mysql.connector][initializeMySqlConnector][Error] error mysql failed to connect');
                throw new Error('not able to connect to database');
            }
            else {
                console.log('[mysql.connector][initializeMySqlConnector][Success] connection made');
                connection.release();
            }
        });
    } catch (error) {
        console.error('[mysql.connector][initializeMySqlConnector][Error]: ', error);
        throw new Error('Failed to initialize connection pool');
    }
};

export const getExecutor = (
    connection?: PoolConnection
): QueryExecutor => {
    if (connection) {
        return connection;
    }

    if (!pool) { // if no pool exists, create one
        initializeMySqlConnector();
    }
    return pool!;
};

export const execute = <T>(
    query: string,
    params: string[] | Object
): Promise<T> => {
    const executor = getExecutor();
    return executeWithExecutor<T>(executor, query, params);
};

/**
 * @deprecated replaced by executor pattern
 */
export const executeWithConnection = <T>(
    connection: PoolConnection, 
    query: string, 
    params: QueryParams
) : Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        connection.query(query, params, (error, results) => {
            if (error) { // if a transactional error occurs, reject
                reject(error);
                return;
            }
            resolve(results as T); // resolve with the results as type T
        });
    });
};

/**
 * Executes a query using any SQL executor
 * 
 * This is used internally by DAOs
 * 
 * @param executor 
 * @param query 
 * @param params 
 * @returns 
 */
export const executeWithExecutor = <T>(
    executor: QueryExecutor,
    query: string,
    params: string[] | Object
): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        executor.query(
            query,
            params,
            (error, results) => {
                if (error) { // if a transactional error occurs, reject
                    reject(error);
                    return;
                }
                resolve(results as T); // resolve with the results as type T
            }
        );
    });
};


/**
 * Executes a series of SQL operations atomically.
 *
 * The connection is owned by this function and released
 * after commit or rollback.
 */
export const transaction = async <T>(
    callback: (connection: PoolConnection) => Promise<T>
): Promise<T> => {

    if (!pool) {
        initializeMySqlConnector();
    }

    const connection = await acquireConnection();

    let transactionStarted = false;
    let destroyConnection = false;

    try {
        await beginTransaction(connection);
        transactionStarted = true;

        const result = await callback(connection);

        try {
            await commitTransaction(connection);
        } catch (commitError) {
            // A failed commit can leave the outcome uncertain.
            // Do not return this connection to the pool.
            destroyConnection = true;
            throw commitError;
        }

        return result;

    } catch (error) {
        // if we started a transaction and have not already decided to destroy the connection, rollback
        if (transactionStarted && !destroyConnection) {
            try {
                await rollbackTransaction(connection);
            } catch (rollbackError) {
                // if we cannot safely rollback, destroy the connection rather than releasing it to the pool
                // this avoids arbitrary operations escaping the transaction into a different transaction
                destroyConnection = true;

                console.error(
                    '[mysql.connector][transaction][Rollback Error]:',
                    rollbackError
                );
            }
        }

        throw error;

    } finally {
        // either destroy or release the connection, based on transaction status
        if (destroyConnection) {
            connection.destroy();
        } else {
            connection.release();
        }
    }
};

/**
 * Executes a callback-based MySQL operation as a Promise
 */
const acquireConnection = (): Promise<PoolConnection> => {
    return new Promise((resolve, reject) => {
        pool!.getConnection((error, connection) => {
            if (error) {
                reject(error);
                return;
            }
        });
    });
};

/** 
 * Private Helper method to begin a transaction 
 */
const beginTransaction = (connection: PoolConnection): Promise<void> => {
    return new Promise((resolve, reject) => {
        connection.beginTransaction((error) => {
            // if the transaction encounters an error, reject to trigger rollback
            if (error) {
                reject(error);
                return;
            }
            // no errors, so resolve it
            resolve();
        });
    });
};

/**
 * Private Helper method for committing a transaction
 * @param connection The connection the commit uses
 * @returns Promise on the commit state
 */
const commitTransaction = (connection: PoolConnection): Promise<void> => {
    return new Promise((resolve, reject) => {
        connection.commit((error) => {
            // if the commit generates an error, reject to begin rollback process
            if (error) {
                reject(error);
                return;
            }
            // no errors when committing, so resolve the promise
            resolve();
        });
    });
};

/**
 * 
 * @param connection Private Helper method for transaction rollback
 * @returns 
 */
const rollbackTransaction = (connection: PoolConnection): Promise<void> => {
    return new Promise((resolve, reject) => {
        connection.rollback((error) => {
            // error during rollback process
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
};