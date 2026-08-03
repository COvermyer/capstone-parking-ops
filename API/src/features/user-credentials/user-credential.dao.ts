/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { getExecutor, executeWithExecutor } from '../../services/mysql.connector';
import { buildUpdateUserCredentialQuery, userCredentialQueries } from './user-credential.queries';
import { HashedUpdateUserCredentialRequest, UserCredential } from './user-credential.model';
import { OkPacket, PoolConnection } from 'mysql';
import { UpdateQuery } from '../../types/update-query.model';

// =============================
//              CREATE
// =============================
/**
 * 
 * @param credential 
 * @param connection 
 * @returns 
 */
export const createUserCredential = async (credential: UserCredential, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<OkPacket>(executor, userCredentialQueries.addUserCredential, [credential.user_id, credential.username, credential.password_hash]);
}


// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readUserCredentials = async (connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<UserCredential[]>(executor, userCredentialQueries.getAllUserCredentials, []);
};

/**
 * 
 * @param user_id 
 * @returns 
 */
export const readUserCredentialByUserId = async (user_id: number, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<UserCredential[]>(executor, userCredentialQueries.getUserCredentialByUserId, [user_id]);
};

/**
 * 
 * @param username 
 * @returns 
 */
export const readUserCredentialByUsername = async (username: string, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<UserCredential[]>(executor, userCredentialQueries.getUserCredentialByUsername, [username]);
};


// =============================
//              UPDATE
// =============================
/**
 * 
 * @param user_id 
 * @param request 
 * @param connection 
 * @returns 
 */
export const updateUserCredential = async (user_id: number, request: HashedUpdateUserCredentialRequest, connection?: PoolConnection) => {
    const updateQuery: UpdateQuery = buildUpdateUserCredentialQuery(user_id, request);
    const executor = getExecutor(connection);
    return executeWithExecutor<OkPacket>(executor, updateQuery.sql, updateQuery.values);
};


// =============================
//              DELETE
// =============================
/**
 * 
 * @param user_id 
 * @param connection 
 * @returns 
 */
export const deleteUserCredential = async (user_id: number, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<OkPacket>(executor, userCredentialQueries.deleteUserCredential, [user_id]);
};