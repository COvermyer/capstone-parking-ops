export const userCredentialQueries = {
    getAllUserCredentials: `SELECT * FROM user_credentials;`,
    getUserCredentialByUserId: `SELECT * FROM user_credentials WHERE user_id = ?;`,
    getUserCredentialByUsername: `SELECT * FROM user_credentials WHERE username = ?;`,
}