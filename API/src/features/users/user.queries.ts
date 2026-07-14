/**
 * Author: Caleb Overmyer
 * Filename: user.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const userQueries = {
    getAllUsers: `SELECT * FROM users;`,
    getUsersPaginated: `SELECT * FROM users ORDER BY user_id ASC LIMIT ? OFFSET ?`,
    getUserById: `SELECT * FROM users WHERE user_id = ?;`,
    getUserByUsername: `SELECT * FROM users u JOIN user_credentials c ON u.user_id = c.user_id WHERE c.username = ?;`,
    getUserByCompanyId: `SELECT * FROM users WHERE company_id = ?`,
    createUser: `INSERT INTO users (company_id, first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?, ?);`,
    updateUser: `UPDATE users SET company_id = ?, first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE user_id = ?;`,
    deleteUserByUserId: `DELETE FROM users WHERE user_id = ?;`
}