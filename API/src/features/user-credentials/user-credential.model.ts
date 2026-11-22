/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.model.ts
 * Created: 07/10/2026
 */
export interface UserCredential {
    user_id: number;
    username: string;
    password_hash: string;
};

/**
 * Used by query builder to dynamically build the update query
 */
export interface UpdateUserCredentialRequest {
    user_id: number;
    username?: string;
    password_hash?: string;
}

/**
 * Service-level update request model - used by service for validating if the current password is valid before
 * Proceeding with the update - ID is gathered from the JWT identity on controller layer
 */
export interface UpdateAuthenticatedUserCredentialRequest {
    current_password: string;
    username?: string,
    new_password?: string;
};