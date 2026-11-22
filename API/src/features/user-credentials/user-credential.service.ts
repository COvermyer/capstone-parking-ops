/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as userCredentialDao from './user-credential.dao';
import { AuthenticatedUser } from '../auth/authenticated-user';
import { UpdateUserCredentialRequest, UpdateAuthenticatedUserCredentialRequest, UserCredential } from './user-credential.model';
import { PoolConnection } from 'mysql';
import * as passwordService from '../../services/password.service';

/**
 * Should basically never be needed, should reconsider even having it. 
 * @returns All user credentials stored in the system
 */
export const getUserCredentials = async () => {
    return userCredentialDao.readUserCredentials();
};

export const getUserCredentialByUserId = async (user_id: number) => {
    return userCredentialDao.readUserCredentialByUserId(user_id);
};

export const getUserCredentialByUsername = async (username: string) => {
    return userCredentialDao.readUserCredentialByUsername(username);
};



export const createUserCredential = async (user_id: number, username: string, password: string, connection?: PoolConnection) => {
    try { // try to add the new credential
        const password_hash = await passwordService.hashPassword(password);
        const credential: UserCredential = {
            user_id: user_id,
            username: username,
            password_hash: password_hash,
        };

        return await userCredentialDao.createUserCredential(credential, connection);
    } catch (err: any) {
        // if the error is a unique constraint check failure, return the user-friendly error
        if (err.code === 'ER_DUP_ENTRY') {
            throw new Error("Username already exists"); // FIXME: Change to AppError model
        }
        throw err; // any other errors should throw normally
    }
};

export const updateAuthenticatedUserCredential = async (
    user_id: number,
    request: UpdateAuthenticatedUserCredentialRequest, 
    connection?: PoolConnection
) => {
    try {
        // retrieve existing credentials
        const credentials = await userCredentialDao.readUserCredentialByUserId(user_id, connection);
        const credential = credentials[0];
        if (!credential) { // if the credentials are not found, error out
            throw new Error('User credentials not found');
        }

        // validate the current password
        const validPassword: boolean = await passwordService.verifyPassword(
            request.current_password,
            credential.password_hash
        );
        if (!validPassword) {
            throw new Error('Invalid Password');
        }

        // build database update
        const update: UpdateUserCredentialRequest = {
            user_id: user_id
        };

        if (request.username !== undefined) {
            update.username = request.username;
        }

        if (request.new_password !== undefined) {
            update.password_hash = await passwordService.hashPassword(request.new_password);
        }

        return userCredentialDao.updateUserCredential(user_id, update, connection);
    } catch (err: any) {
        if (err.code === 'EP_DUP_ENTRY') {
            throw new Error("Username already exists");  // FIXME: Change to AppError model
        }
        throw err; // any other errors should throw normally
    }
};

export const deleteUserCredential = async (user_id: number, connection?: PoolConnection) => {
    return userCredentialDao.deleteUserCredential(user_id, connection);
};