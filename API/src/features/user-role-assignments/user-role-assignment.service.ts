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