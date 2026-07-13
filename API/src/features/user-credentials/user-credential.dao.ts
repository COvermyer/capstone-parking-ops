/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute } from '../../services/mysql.connector'
import { userCredentialQueries } from './user-credential.queries';
import { UserCredential } from './user-credential.model';

export const readUserCredentials = async () => {
    return execute<UserCredential[]>(userCredentialQueries.getAllUserCredentials, []);
}

export const readUserCredentialByUserId = async (user_id: number) => {
    return execute<UserCredential[]>(userCredentialQueries.getUserCredentialByUserId, [user_id]);
}

export const readUserCredentialByUsername = async (username: string) => {
    return execute<UserCredential[]>(userCredentialQueries.getUserCredentialByUsername, [username]);
}