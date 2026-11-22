/**
 * Author: Caleb Overmyer
 * Filename: user-role-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const userRoleCodeQueries = {
    // Create

    // Read
    getAllUserRoles: 'SELECT * FROM user_role_codes',
    getUserRoleById: 'SELECT * FROM user_role_codes WHERE role_id = ?',

    // Update
    // We will never update, only add or delete

    // Delete
};