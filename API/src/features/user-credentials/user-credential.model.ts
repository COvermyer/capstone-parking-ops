/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.model.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export interface UserCredential {
    user_id: number;
    username: string;
    password_hash: string;
};

export interface CreateUserCredentialRequest {
    user_id: number;
    username: string;
    password: string;
}

export interface UpdateUserCredentialRequest {
    current_password: string;
    
    username?: string;
    new_password?: string;
}

export interface HashedUpdateUserCredentialRequest {
    username?: string;
    new_password_hash?: string;
}