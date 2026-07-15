/**
 * Author: Caleb Overmyer
 * Filename: mysql.connector.ts
 * Created: 07/06/2026
 * Last Updated: 07/06/2026
 */
import { createPool, Pool, PoolConnection } from 'mysql';
let pool: Pool | null = null;

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

/**
 * Executes a query or command in the database
 * @param query The query string to be run against the database
 * @param params an array of values to format into the query string as parameters
 * @returns a Promise of type T that is the result of the SQL operation
 */
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        if (!pool) { // if no pool exists, create one
            initializeMySqlConnector();
        }

        return new Promise<T>((resolve, reject) => {
            pool!.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            })
        });
    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
}

export const executeWithConnection = <T>(
    connection: PoolConnection, 
    query: string, 
    params: string[] | Object
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

export const transaction = async <T>(
    callback: (connection: PoolConnection) => Promise<T>
) : Promise<T> => {
    if (!pool) { // if no pool exists, create one
        initializeMySqlConnector();
    }

    return new Promise<T>((resolve, reject) => {
        pool!.getConnection(async (error, connection) => {
            if (error) { // if an error has occurred, reject the promise
                connection.release();
                reject(error);
                return;
            }

            connection.beginTransaction(async (error) => {
                if (error) { // if an error exists, reject the transaction
                    connection.release();
                    reject(error);
                    return;
                }

                try {
                    // execute the callers transactional work
                    const result = await callback(connection);
                    connection.commit((error) => {
                        if (error) { // if an error exists during commit, reject and rollback
                            connection.rollback(() => {
                                connection.release();
                                reject(error);
                            });
                            return;
                        }

                        // transaction committed successfully
                        connection.release();
                        resolve(result); // all errors have been avoided, resolve
                    });
                } catch (error) {
                    connection.rollback(() => { // if an error has occurred, rollback the transaction
                        connection.release();
                        reject(error);
                    });
                }
                
            });
        });
    });
};