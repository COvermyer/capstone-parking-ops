/**
 * Author: Caleb Overmyer
 * Filename: user-role-assignment.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as userRoleAssignmentDao from './user-role-assignment.dao';

export const getUserRoleAssignments = async () => {
    return userRoleAssignmentDao.readUserRoleAssignments();
}

export const getUserRoleAssignmentsByUserId = async (user_id: number) => {
    return userRoleAssignmentDao.readUserRoleAssignmentsByUserId(user_id);
}

export const getUserRoleAssignmentsByRoleId = async (role_id: number) => {
    return userRoleAssignmentDao.readUserRoleAssignmentsByRoleId(role_id);
}