/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const userCredentialQueries = {
    getAllUserCredentials: `SELECT * FROM user_credentials;`,
    getUserCredentialByUserId: `SELECT * FROM user_credentials WHERE user_id = ?;`,
    getUserCredentialByUsername: `SELECT * FROM user_credentials WHERE username = ?;`,
}