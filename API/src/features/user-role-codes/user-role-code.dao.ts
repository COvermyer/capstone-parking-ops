/**
 * Author: Caleb Overmyer
 * Filename: user-role-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import { execute, executeWithConnection } from '../../services/mysql.connector';
import { UserRoleCode } from './user-role-code.model';
import { userRoleCodeQueries } from './user-role-code.queries';

// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readUserRoleCodes = async (connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<UserRoleCode[]>(connection, userRoleCodeQueries.getAllUserRoles, []);
    return execute<UserRoleCode[]>(userRoleCodeQueries.getAllUserRoles, []);
}

/**
 * 
 * @param role_id 
 * @returns 
 */
export const readUserRoleCodesById = async (role_id: number, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<UserRoleCode[]>(connection, userRoleCodeQueries.getUserRoleById, [role_id]);
    return execute<UserRoleCode[]>(userRoleCodeQueries.getUserRoleById, [role_id]);
}