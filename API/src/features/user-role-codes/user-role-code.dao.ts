import { execute } from '../../services/mysql.connector';
import { UserRoleCode } from './user-role-code.model';
import { userRoleCodeQueries } from './user-role-code.queries';

export const readUserRoleCodes = async () => {
    return execute<UserRoleCode[]>(userRoleCodeQueries.getAllUserRoles, []);
}

export const readUserRoleCodesById = async (role_id: number) => {
    return execute<UserRoleCode[]>(userRoleCodeQueries.getUserRoleById, [role_id]);
}