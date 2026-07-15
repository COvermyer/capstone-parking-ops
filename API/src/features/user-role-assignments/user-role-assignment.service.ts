/**
 * Author: Caleb Overmyer
 * Filename: user-role-assignment.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { OkPacket, PoolConnection } from 'mysql';
import * as userRoleAssignmentDAO from './user-role-assignment.dao';
import { UserRoleAssignment } from './user-role-assignment.model';
// import { executeWithConnection } from '../../services/mysql.connector';

export const getUserRoleAssignments = async () => {
    return userRoleAssignmentDAO.readUserRoleAssignments();
}

export const getUserRoleAssignmentsByUserId = async (user_id: number) => {
    return userRoleAssignmentDAO.readUserRoleAssignmentsByUserId(user_id);
}

export const getUserRoleAssignmentsByRoleId = async (role_id: number) => {
    return userRoleAssignmentDAO.readUserRoleAssignmentsByRoleId(role_id);
}

export const createUserRoleAssignment = async (userRoleAssignment: UserRoleAssignment, connection?: PoolConnection) => {
    if (connection)
        return userRoleAssignmentDAO.createUserRoleAssignment(userRoleAssignment, connection);
    return userRoleAssignmentDAO.createUserRoleAssignment(userRoleAssignment);
};

export const deleteRoleFromUser = async (userRoleAssignment: UserRoleAssignment, connection?: PoolConnection) => {
    if (connection)
        return userRoleAssignmentDAO.deleteRoleFromUser(userRoleAssignment, connection);
    return userRoleAssignmentDAO.deleteRoleFromUser(userRoleAssignment);
};

export const deleteAllRolesFromUserById = async (user_id: number, connection?: PoolConnection) => {
    if (connection)
        return userRoleAssignmentDAO.deleteAllRolesFromUserById(user_id, connection);
    return userRoleAssignmentDAO.deleteAllRolesFromUserById(user_id);
};