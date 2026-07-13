/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as userCredentialDao from './user-credential.dao';
import { AuthenticatedUser } from '../auth/authenticated-user';

export const getUserCredentials = async (authenticatedUser: AuthenticatedUser) => {
    return userCredentialDao.readUserCredentials();
}

export const getUserCredentialByUserId = async (user_id: number) => {
    return userCredentialDao.readUserCredentialByUserId(user_id);
}

export const getUserCredentialByUsername = async (username: string) => {
    return userCredentialDao.readUserCredentialByUsername(username);
}