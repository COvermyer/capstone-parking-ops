/**
 * Author: Caleb Overmyer
 * Filename: authorization.service.ts
 * Created: 2026-07-14
 * Last Modified: 2026-07-14
 * 
 * This service determines whether or not a user has the required roles to access a resource
 */

import { AuthenticatedUser } from "../features/auth/authenticated-user";
import * as UserRoleAssignmentService from '../features/user-role-assignments/user-role-assignment.service';
import lookupService from "./lookup.service";

/**
 * compares the Authenticated user against the provided roles list. Uses the database as SST for roles,
 * not the AuthenticatedUser object
 * @param user The user making the request
 * @param requiredRoles The list of roles that are permitted to use the endpoint
 * @returns a Promise of a boolean if the user possesses the necessary roles
 */
export const hasRoles = async (
    user: AuthenticatedUser,
    requiredRoles: string[]
): Promise<boolean> => {
    
    const roleAssignments = await UserRoleAssignmentService.getUserRoleAssignmentsByUserId(user.user_id);

    // convert role assignments to role codes
    const userRoles = roleAssignments.map(assignment =>
        lookupService.getRole(assignment.role_id)
    );

    console.log(`[AuthorizationService][hasRole] ${user.username} [${user.user_id}]: ${userRoles}`);
    
    // Return true if the user possesses any required Role
    return requiredRoles.some(role => 
        userRoles.includes(role)
    );
};