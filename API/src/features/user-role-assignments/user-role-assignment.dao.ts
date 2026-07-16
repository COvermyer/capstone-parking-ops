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


// =============================
//              CREATE
// =============================
/**
 * 
 * @param role_assignment 
 * @param connection 
 * @returns 
 */
export const createUserRoleAssignment = async (role_assignment: UserRoleAssignment, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<OkPacket>(connection, userRoleAssignmentQueries.createUserRoleAssignment, [role_assignment.user_id, role_assignment.role_id])
    return execute<OkPacket>(userRoleAssignmentQueries.createUserRoleAssignment, [role_assignment.user_id, role_assignment.role_id]);
};


// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readUserRoleAssignments = async () => {
    return execute<UserRoleAssignment[]>(userRoleAssignmentQueries.getAllUserRoleAssignments, []);
}

/**
 * 
 * @param user_id 
 * @returns 
 */
export const readUserRoleAssignmentsByUserId = async (user_id: number) => {
    return execute<UserRoleAssignment[]>(userRoleAssignmentQueries.getUserRoleAssignmentByUserId, [user_id]);
}

/**
 * 
 * @param role_id 
 * @returns 
 */
export const readUserRoleAssignmentsByRoleId = async (role_id: number) => {
    return execute<UserRoleAssignment[]>(userRoleAssignmentQueries.getUserRoleAssignmentsByRoleId, [role_id]);
}

// =============================
//              UPDATE // TODO:
// =============================


// =============================
//              DELETE
// =============================
/**
 * 
 * @param role_assignment 
 * @param connection 
 * @returns 
 */
export const deleteRoleFromUser = async (role_assignment: UserRoleAssignment, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<OkPacket>(connection, userRoleAssignmentQueries.deleteRoleFromUser, [role_assignment.user_id, role_assignment.role_id]);
    return execute<OkPacket>(userRoleAssignmentQueries.deleteRoleFromUser, [role_assignment.user_id, role_assignment.role_id]);
};

/**
 * 
 * @param user_id 
 * @param connection 
 * @returns 
 */
export const deleteAllRolesFromUserById = async (user_id: number, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<OkPacket>(connection, userRoleAssignmentQueries.deleteAllRolesFromUserById, [user_id]);
    return execute<OkPacket>(userRoleAssignmentQueries.deleteAllRolesFromUserById, [user_id]);
};