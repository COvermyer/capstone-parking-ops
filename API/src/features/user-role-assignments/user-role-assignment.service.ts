/**
 * Author: Caleb Overmyer
 * Filename: user-role-assignment.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { OkPacket, PoolConnection } from 'mysql';
import * as userRoleAssignmentDAO from './user-role-assignment.dao';
import * as userService from '../users/user.service';
import { UserRoleAssignment } from './user-role-assignment.model';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { AppError } from '../../common/errors/app.error';
// import { executeWithConnection } from '../../services/mysql.connector';

export const getUserRoleAssignments = async (): Promise<UserRoleAssignment[]> => {
    const assignments = await userRoleAssignmentDAO.readUserRoleAssignments();
    if (assignments.length === 0) {
        throw new AppError("No user role assignments found", HTTP_STATUS.NOT_FOUND);
    }
    return assignments;
}

export const getUserRoleAssignmentsByUserId = async (user_id: number): Promise<UserRoleAssignment[]> => {
    const assignments = await userRoleAssignmentDAO.readUserRoleAssignmentsByUserId(user_id);
    if (assignments.length === 0) {
        throw new AppError("No user role assignments found for the specified user", HTTP_STATUS.NOT_FOUND);
    }
    return assignments;
}

export const getUserRoleAssignmentsByRoleId = async (role_id: number): Promise<UserRoleAssignment[]> => {
    const assignments = await userRoleAssignmentDAO.readUserRoleAssignmentsByRoleId(role_id);
    if (assignments.length === 0) {
        throw new AppError("No user role assignments found for the specified role", HTTP_STATUS.NOT_FOUND);
    }
    return assignments;
}

export const createUserRoleAssignment = async (userRoleAssignment: UserRoleAssignment, connection?: PoolConnection) => {
    return userRoleAssignmentDAO.createUserRoleAssignment(userRoleAssignment, connection);
};

export const deleteRoleFromUser = async (userRoleAssignment: UserRoleAssignment, connection?: PoolConnection) => {
    return userRoleAssignmentDAO.deleteRoleFromUser(userRoleAssignment, connection);
};

export const deleteAllRolesFromUserById = async (user_id: number, connection?: PoolConnection) => {
    const assignment = await userRoleAssignmentDAO.readUserRoleAssignmentsByUserId(user_id, connection);
    if (assignment.length === 0) { // not found
        throw new AppError(`No role assignments found for user with ID ${user_id}`, HTTP_STATUS.NOT_FOUND);
    }
    
    // return the result of the deletion operation, using the provided connection if available
    return userRoleAssignmentDAO.deleteAllRolesFromUserById(user_id, connection);
};