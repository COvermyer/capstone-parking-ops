/**
 * Author: Caleb Overmyer
 * Filename: user-role-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute } from '../../services/mysql.connector';
import { UserRoleCode } from './user-role-code.model';
import { userRoleCodeQueries } from './user-role-code.queries';

// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readUserRoleCodes = async () => {
    return execute<UserRoleCode[]>(userRoleCodeQueries.getAllUserRoles, []);
}

/**
 * 
 * @param role_id 
 * @returns 
 */
export const readUserRoleCodesById = async (role_id: number) => {
    return execute<UserRoleCode[]>(userRoleCodeQueries.getUserRoleById, [role_id]);
}