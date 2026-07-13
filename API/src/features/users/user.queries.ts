export const userQueries = {
    getAllUsers: 'SELECT * FROM users',
    getUserById: 'SELECT * FROM users WHERE user_id = ?',
    getUserByUsername: `SELECT * FROM users u JOIN user_credentials c ON u.user_id = c.user_id WHERE c.username = ?`,
}