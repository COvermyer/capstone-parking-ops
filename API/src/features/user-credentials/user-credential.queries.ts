/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/15/2026
 */
import { UpdateQuery } from "../../types/update-query.model"
import { HashedUpdateUserCredentialRequest } from "./user-credential.model"

export const userCredentialQueries = {
    getAllUserCredentials: `SELECT * FROM user_credentials;`,
    getUserCredentialByUserId: `SELECT * FROM user_credentials WHERE user_id = ?;`,
    getUserCredentialByUsername: `SELECT * FROM user_credentials WHERE username = ?;`,
    addUserCredential: `INSERT INTO user_credentials (user_id, username, password_hash) VALUES (?, ?, ?);`,
    // updateUserCredential: `UPDATE user_credentials SET username = ?, password_hash = ? WHERE user_id = ?;`,
    deleteUserCredential: `DELETE FROM user_credentials WHERE user_id = ?;`,
}

export const buildUpdateUserCredentialQuery = (
    userId: number,
    request: HashedUpdateUserCredentialRequest
) : UpdateQuery => {
    const setClauses: string[] = [];
    const values: unknown[] = [];

    // Username
    if (request.username !== undefined) {
        setClauses.push('username = ?');
        values.push(request.username)
    }

    // Password Hash
    if (request.new_password_hash !== undefined) {
        setClauses.push('password_hash = ?');
        values.push(request.new_password_hash);
    }

    // User ID
    values.push(userId);

    return({
        sql: `
            UPDATE user_credentials
            SET ${setClauses.join(', ')}
            WHERE user_id = ?;
        `,
        values
    });
};