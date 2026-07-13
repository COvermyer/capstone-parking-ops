import api from './api';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';

/**
 * Login method to be used for credential handling
 * @param credentials a LoginRequest object with filled username/password credentials
 * @returns a promise to provide a LoginResponse object, which will contain a JWT token if authorized
 */
const login = async (
    credentials: LoginRequest
): Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>('/auth/login', credentials);
    console.log('API response: ', response.data); // TODO: Testing only, remove me

    localStorage.setItem('token', response.data.token);

    return response.data;
};

/**
 * logout method to destroy the current session token
 */
const logout = () => {
    localStorage.removeItem('token');
};

/**
 * returns the currently stored JWT token, or null if one does not exist
 */
const getToken = (): string | null => {
    return localStorage.getItem("token");
};

/**
 * Defines default export
 */
const authService = {
    login,
    logout,
    getToken
}

export default authService;