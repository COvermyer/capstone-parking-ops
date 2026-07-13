/**
 * Author: Caleb Overmyer
 * Filename: user-role-assignment.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute } from '../../services/mysql.connector';
import { UserRoleAssignment } from './user-role-assignment.model';
import { userRoleAssignmentQueries } from './user-role-assignment.queries';

export const readUserRoleAssignments = async () => {
    return execute<UserRoleAssignment[]>(userRoleAssignmentQueries.getAllUserRoleAssignments, []);
}

export const readUserRoleAssignmentsByUserId = async (user_id: number) => {
    return execute<UserRoleAssignment[]>(userRoleAssignmentQueries.getUserRoleAssignmentByUserId, [user_id]);
}

export const readUserRoleAssignmentsByRoleId = async (role_id: number) => {
    return execute<UserRoleAssignment[]>(userRoleAssignmentQueries.getUserRoleAssignmentsByRoleId, [role_id]);
}