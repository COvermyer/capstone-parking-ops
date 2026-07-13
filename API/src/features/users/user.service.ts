/**
 * Author: Caleb Overmyer
 * Filename: user.model.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as userDAO from './user.dao';
import * as userRoleAssignmentDAO from '../user-role-assignments/user-role-assignment.dao';
import { User } from './user.model';
import lookupService from '../../services/lookup.service';

/**
 * Get all method for Users
 * @returns a Promise for User array
 */
export const getAllUsers = async (): Promise<User[]> => {
    const users = await userDAO.readUsers();

    // Role logic
    for (const user of users) {
        let assignments = await userRoleAssignmentDAO.readUserRoleAssignmentsByUserId(user.user_id);
        (user as User).roles = assignments.map((assignment) => 
            assignment.role_id).map((role_id) => lookupService.getRole(role_id) as string
        );
    }

    return users;
}

/**
 * Get by user id method for Users
 * @param user_id The user_id of the requested User
 * @returns a Promise for User array
 */
export const getUserById = async (user_id: number): Promise<User[]> => {
    const users = await userDAO.readUserById(user_id);

    // Role logic
    for (const user of users) {
        let assignments = await userRoleAssignmentDAO.readUserRoleAssignmentsByUserId(user.user_id);
        (user as User).roles = assignments.map((assignment) => 
            assignment.role_id).map((role_id) => lookupService.getRole(role_id) as string
        );
    }

    return users;
}

/**
 * Get by Username method for Users - joins the user-credential table 
 * @param username The username associated with the requested user
 * @returns a Promise for User array
 */
export const getUserByUsername = async (username: string): Promise<User[]> => {
    const users = await userDAO.readUserByUsername(username);

    // Role logic
    for (const user of users) {
        let assignments = await userRoleAssignmentDAO.readUserRoleAssignmentsByUserId(user.user_id);
        (user as User).roles = assignments.map((assignment) =>
            assignment.role_id).map((role_id) => lookupService.getRole(role_id) as string
        );
    }

    return users;
}