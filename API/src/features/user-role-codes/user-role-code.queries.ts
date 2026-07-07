export const userRoleCodeQueries = {
    getAllUserRoles: 'SELECT * FROM user_role_codes',
    getUserRoleById: 'SELECT * FROM user_role_codes WHERE role_id = ?',
};