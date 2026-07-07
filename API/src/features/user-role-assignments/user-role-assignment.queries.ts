export const userRoleAssignmentQueries = {
    getAllUserRoleAssignments: `SELECT * FROM user_role_assignments;`,
    getUserRoleAssignmentByUserId: `SELECT * FROM user_role_assignments WHERE user_id = ?;`,
    getUserRoleAssignmentsByRoleId: `SELECT * FROM user_role_assignments WHERE role_id = ?;`,
}