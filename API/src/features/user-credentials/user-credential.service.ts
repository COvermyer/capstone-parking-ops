/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as userCredentialDao from './user-credential.dao';
import { AuthenticatedUser } from '../auth/authenticated-user';
import { HashedUpdateUserCredentialRequest, UpdateUserCredentialRequest, UserCredential } from './user-credential.model';
import { PoolConnection } from 'mysql';
import * as passwordService from '../../services/password.service';

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

export const updateUserCredential = async (user_id: number, request: UpdateUserCredentialRequest, connection?: PoolConnection) => {
    try {
        // Verify Current Password
        const currPasswordHash = (await userCredentialDao.readUserCredentialByUserId(user_id))[0];
        if (!(await passwordService.verifyPassword(request.current_password, currPasswordHash.password_hash))) {
            throw new Error('Invalid password')
        }

        // validate request fields and perform hashing
        // If all update fields are undefined, throw an error
        if (request.username === undefined && request.new_password === undefined)
            throw new Error('No changes in req.body');

        // define the HashedUserUpdateCredentialRequest and fill its properties with anything defined
        let hashed: HashedUpdateUserCredentialRequest = {}
        if (request.username !== undefined) {
            hashed.username = request.username;
        }

        if (request.new_password !== undefined) {
            hashed.new_password_hash = await passwordService.hashPassword(request.new_password);
        }

        // Return the HashedUpdateUserCredentialRequest through to the DAO
        if (connection)
            return userCredentialDao.updateUserCredential(user_id, hashed, connection);
        return userCredentialDao.updateUserCredential(user_id, hashed);
    } catch (error) {
        throw error;
    }
};

export const deleteUserCredential = async (user_id: number) => {
    return userCredentialDao.deleteUserCredential(user_id);
};