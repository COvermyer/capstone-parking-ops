import * as userCredentialDao from './user-credential.dao';
import { AuthenticatedUser } from '../../types/authenticated-user';

export const getUserCredentials = async (authenticatedUser: AuthenticatedUser) => {
    return userCredentialDao.readUserCredentials();
}

export const getUserCredentialByUserId = async (user_id: number) => {
    return userCredentialDao.readUserCredentialByUserId(user_id);
}

export const getUserCredentialByUsername = async (username: string) => {
    return userCredentialDao.readUserCredentialByUsername(username);
}