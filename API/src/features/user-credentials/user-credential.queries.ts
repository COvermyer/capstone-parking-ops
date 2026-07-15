/**
 * Author: Caleb Overmyer
 * Filename: user-role-credential.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/15/2026
 */
export const userCredentialQueries = {
    getAllUserCredentials: `SELECT * FROM user_credentials;`,
    getUserCredentialByUserId: `SELECT * FROM user_credentials WHERE user_id = ?;`,
    getUserCredentialByUsername: `SELECT * FROM user_credentials WHERE username = ?;`,
    addUserCredential: `INSERT INTO user_credentials (user_id, username, password_hash) VALUES (?, ?, ?);`,
    updateUserCredential: `UPDATE user_credentials SET username = ?, password_hash = ? WHERE user_id = ?;`,
    deleteUserCredential: `DELETE FROM user_credentials WHERE user_id = ?;`,
}