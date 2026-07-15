/**
 * Author: Caleb Overmyer
 * Filename: user-role-assignment.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */

export const userRoleAssignmentQueries = {
    getAllUserRoleAssignments: `SELECT * FROM user_role_assignments;`,
    getUserRoleAssignmentByUserId: `SELECT * FROM user_role_assignments WHERE user_id = ?;`,
    getUserRoleAssignmentsByRoleId: `SELECT * FROM user_role_assignments WHERE role_id = ?;`,
    createUserRoleAssignment: `INSERT INTO user_role_assignments (user_id, role_id) VALUES (?, ?);`,
    deleteRoleFromUser: `DELETE FROM user_role_assignments WHERE user_id = ? AND role_id = ?;`,
    deleteAllRolesFromUserById: `DELETE FROM user_role_assignments WHERE user_id = ?;`,
}