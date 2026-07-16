/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute, executeWithConnection } from '../../services/mysql.connector'
import { buildUpdateUserCredentialQuery, userCredentialQueries } from './user-credential.queries';
import { HashedUpdateUserCredentialRequest, UserCredential } from './user-credential.model';
import { OkPacket, PoolConnection } from 'mysql';
import { UpdateQuery } from '../../types/update-query.model';

export const readUserCredentials = async () => {
    return execute<UserCredential[]>(userCredentialQueries.getAllUserCredentials, []);
};

export const readUserCredentialByUserId = async (user_id: number) => {
    return execute<UserCredential[]>(userCredentialQueries.getUserCredentialByUserId, [user_id]);
};

export const readUserCredentialByUsername = async (username: string) => {
    return execute<UserCredential[]>(userCredentialQueries.getUserCredentialByUsername, [username]);
};

export const addUserCredential = async (credential: UserCredential, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<OkPacket>(connection, userCredentialQueries.addUserCredential, [credential.user_id, credential.username, credential.password_hash])
    return execute<OkPacket>(userCredentialQueries.addUserCredential, [credential.user_id, credential.username, credential.password_hash]);
}

// export const updateUserCredential = async (user_id: number, credential: UserCredential, connection?: PoolConnection) => {
//     if (connection)
//         return executeWithConnection<OkPacket>(connection, userCredentialQueries.updateUserCredential, [credential.username, credential.password_hash, user_id])
//     return execute<OkPacket>(userCredentialQueries.updateUserCredential, [credential.username, credential.password_hash, user_id]);
// };

export const updateUserCredential = async (user_id: number, request: HashedUpdateUserCredentialRequest, connection?: PoolConnection) => {
    const updateQuery: UpdateQuery = buildUpdateUserCredentialQuery(user_id, request);
    if (connection)
        return executeWithConnection<OkPacket>(connection, updateQuery.sql, updateQuery.values);
    return execute<OkPacket>(updateQuery.sql, updateQuery.values);

};

export const deleteUserCredential = async (user_id: number, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<OkPacket>(connection, userCredentialQueries.deleteUserCredential, [user_id])
    return execute<OkPacket>(userCredentialQueries.deleteUserCredential, [user_id])
};