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
}