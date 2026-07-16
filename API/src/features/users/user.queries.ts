/**
 * Author: Caleb Overmyer
 * Filename: user.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { UpdateQuery } from "../../types/update-query.model";
import { UpdateUserRequest } from "./user.model";

/**
 * Defines static queries for the `users` table
 */
export const userQueries = {
    getAllUsers: `SELECT * FROM users;`,
    getUsersPaginated: `SELECT * FROM users ORDER BY user_id ASC LIMIT ? OFFSET ?`,
    getUserById: `SELECT * FROM users WHERE user_id = ?;`,
    getUserByUsername: `SELECT * FROM users u JOIN user_credentials c ON u.user_id = c.user_id WHERE c.username = ?;`,
    getUserByCompanyId: `SELECT * FROM users WHERE company_id = ?`,
    createUser: `INSERT INTO users (company_id, first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?, ?);`,
    // updateUser: `UPDATE users SET company_id = ?, first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE user_id = ?;`,
    deleteUserByUserId: `DELETE FROM users WHERE user_id = ?;`
};

// Builds an UpdateQuery object with the UpdateUserRequest model
export const buildUpdateUserQuery = (
    userId: number,
    request: UpdateUserRequest
): UpdateQuery => {
    const setClauses: string[] = [];
    const values: unknown[] = [];

    // company_id
    if (request.company_id !== undefined) {
        setClauses.push('company_id = ?');
        values.push(request.company_id);
    }

    // first_name
    if (request.first_name !== undefined) {
        setClauses.push('first_name = ?');
        values.push(request.first_name);
    }

    // last_name
    if (request.last_name !== undefined) {
        setClauses.push('last_name = ?');
        values.push(request.last_name);
    }

    // email
    if (request.email !== undefined) {
        setClauses.push('email = ?');
        values.push(request.email);
    }

    // phone_number
    if (request.phone_number !== undefined) {
        setClauses.push('phone_number = ?');
        values.push(request.phone_number);
    }

    // user_id
    values.push(userId);

    return ({
        sql: `
            UPDATE users
            SET ${setClauses.join(", ")}
            WHERE user_id = ?;
        `,
        values
    });
};