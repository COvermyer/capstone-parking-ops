/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as userCredentialDao from './user-credential.dao';
import { AuthenticatedUser } from '../auth/authenticated-user';
import { UserCredential } from './user-credential.model';
import { PoolConnection } from 'mysql';

export const getUserCredentials = async (authenticatedUser: AuthenticatedUser) => {
    return userCredentialDao.readUserCredentials();
};

export const getUserCredentialByUserId = async (user_id: number) => {
    return userCredentialDao.readUserCredentialByUserId(user_id);
};

export const getUserCredentialByUsername = async (username: string) => {
    return userCredentialDao.readUserCredentialByUsername(username);
};

export const createUserCredential = async (credential: UserCredential, connection?: PoolConnection) => {
    try { // try to add the new credential
        if (connection)
            return await userCredentialDao.addUserCredential(credential, connection);
        return await userCredentialDao.addUserCredential(credential);
    } catch (err: any) {
        // if the error is a unique constraint check failure, return the user-friendly error
        if (err.code === 'ER_DUP_ENTRY') {
            throw new Error("Username already exists")
        }
        throw err; // any other errors should throw normally
    }
};

export const deleteUserCredential = async (user_id: number) => {
    return userCredentialDao.deleteUserCredential(user_id);
};