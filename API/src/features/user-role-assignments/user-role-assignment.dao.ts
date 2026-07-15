/**
 * Author: Caleb Overmyer
 * Filename: user-role-assignment.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { OkPacket, PoolConnection } from 'mysql';
import { execute, executeWithConnection } from '../../services/mysql.connector';
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

export const createUserRoleAssignment = async (role_assignment: UserRoleAssignment, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<OkPacket>(connection, userRoleAssignmentQueries.createUserRoleAssignment, [role_assignment.user_id, role_assignment.role_id])
    return execute<OkPacket>(userRoleAssignmentQueries.createUserRoleAssignment, [role_assignment.user_id, role_assignment.role_id]);
};

export const deleteRoleFromUser = async (role_assignment: UserRoleAssignment, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<OkPacket>(connection, userRoleAssignmentQueries.deleteRoleFromUser, [role_assignment.user_id, role_assignment.role_id]);
    return execute<OkPacket>(userRoleAssignmentQueries.deleteRoleFromUser, [role_assignment.user_id, role_assignment.role_id]);
};

export const deleteAllRolesFromUserById = async (user_id: number, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<OkPacket>(connection, userRoleAssignmentQueries.deleteAllRolesFromUserById, [user_id]);
    return execute<OkPacket>(userRoleAssignmentQueries.deleteAllRolesFromUserById, [user_id]);
};