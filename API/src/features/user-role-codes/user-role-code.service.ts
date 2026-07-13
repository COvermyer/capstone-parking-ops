/**
 * Author: Caleb Overmyer
 * Filename: user-role-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as userRoleCodeDao from './user-role-code.dao';

export const getUserRoles = async () => {
    return userRoleCodeDao.readUserRoleCodes();
}

export const getUserRole = async (role_id: number) => {
    return userRoleCodeDao.readUserRoleCodesById(role_id);
}
