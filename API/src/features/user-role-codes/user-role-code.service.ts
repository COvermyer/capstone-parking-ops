/**
 * Author: Caleb Overmyer
 * Filename: user-role-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { AppError } from '../../common/errors/app.error';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import * as userRoleCodeDao from './user-role-code.dao';
import { UserRoleCode } from './user-role-code.model';

export const getUserRoles = async (): Promise<UserRoleCode[]> => {
    const roles = await userRoleCodeDao.readUserRoleCodes();
    if (roles.length === 0) {
        throw new AppError("No user roles found", HTTP_STATUS.NOT_FOUND);
    }   
    return roles;
}

export const getUserRole = async (role_id: number): Promise<UserRoleCode[]> => {
    const roles = await userRoleCodeDao.readUserRoleCodesById(role_id);
    if (roles.length === 0) {
        throw new AppError("User role not found", HTTP_STATUS.NOT_FOUND);
    }
    return roles;
}
