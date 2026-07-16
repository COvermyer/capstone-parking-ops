/**
 * Author: Caleb Overmyer
 * Filename: user.model.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as userDAO from './user.dao';
// import * as userRoleAssignmentDAO from '../user-role-assignments/user-role-assignment.dao';
import * as userRoleAssignmentService from '../user-role-assignments/user-role-assignment.service';
import { User, CreateUserRequest, UpdateUserRequest } from './user.model';
import lookupService from '../../services/lookup.service';
import * as passwordService from '../../services/password.service';
import { OkPacket, PoolConnection } from 'mysql';
// import { CreateUserRequest } from '../../types/create-user-request.model';
import * as userCredentialService from '../user-credentials/user-credential.service';
// import { UserCredential } from '../user-credentials/user-credential.model';
import { transaction } from '../../services/mysql.connector';


/**
 * Get all method for Users
 * @returns a Promise for User array
 */
export const getAllUsers = async (): Promise<User[]> => {
    const users = await userDAO.readUsers();

    // Role logic
    for (const user of users) {
        let assignments = await userRoleAssignmentService.getUserRoleAssignmentsByUserId(user.user_id);
        (user as User).roles = assignments.map((assignment) => 
            assignment.role_id).map((role_id) => lookupService.getRole(role_id) as string
        );
    }

    return users;
}

/**
 * Gets users by pagination parameters
 * @param page 
 * @param pageSize 
 * @returns 
 */
export const getUsersPaginated = async (page: number, pageSize: number): Promise<User[]> => {
    const users = await userDAO.readUsersPaginated(page, pageSize);

    // role logic
    for (const user of users) {
        let assignments = await userRoleAssignmentService.getUserRoleAssignmentsByUserId(user.user_id);
        (user as User).roles = assignments.map((assignment) => 
            assignment.role_id).map((role_id) => lookupService.getRole(role_id) as string
        );
    }

    return users;
};

/**
 * Get by user id method for Users
 * @param user_id The user_id of the requested User
 * @returns a Promise for User array
 */
export const getUserById = async (user_id: number): Promise<User> => {
    const users: User[] = await userDAO.readUserById(user_id);

    // Role logic
    for (const user of users) {
        let assignments = await userRoleAssignmentService.getUserRoleAssignmentsByUserId(user.user_id);
        (user as User).roles = assignments.map((assignment) => 
            assignment.role_id).map((role_id) => lookupService.getRole(role_id) as string
        );
    }

    return users[0];
}

/**
 * Get by Username method for Users - joins the user-credential table 
 * @param username The username associated with the requested user
 * @returns a Promise for User array
 */
export const getUserByUsername = async (username: string): Promise<User> => {
    const users = await userDAO.readUserByUsername(username);
    const user: User = {
        user_id: users[0].user_id,
        company_id: users[0].company_id,
        first_name: users[0].first_name,
        last_name: users[0].last_name,
        email: users[0].email,
        phone_number: users[0].phone_number,
        created: users[0].created,
        roles: []
    };

    // Role logic
    let assignments = await userRoleAssignmentService.getUserRoleAssignmentsByUserId(user.user_id);
    user.roles = assignments.map((assignment) => assignment.role_id).map((role_id) => lookupService.getRole(role_id) as string);

    return user; // return the constructed User object
}

/**
 * Creates a User with a CreateUserRequest object. This transactional method handles User creation, Role assignments, and user credential creation
 * @param user Creates a user
 * @returns 
 */
export const createUser = async (request: CreateUserRequest) : Promise<OkPacket> => {
    return transaction(async (connection): Promise<OkPacket> => {
        let user: User = {
            user_id: -1, // Throwaway value
            company_id: request.company_id,
            first_name: request.first_name,
            last_name: request.last_name,
            email: request.email,
            phone_number: request.phone_number,
            roles: [ 'USER' ], // DEFAULT ROLE
        }

        const userResult = await userDAO.createUser({
            user_id: -1, // Throwaway value
            company_id: request.company_id,
            first_name: request.first_name,
            last_name: request.last_name,
            email: request.email,
            phone_number: request.phone_number,
            roles: [ 'USER' ], // DEFAULT ROLE
            created: '' // Throwaway value
        }, connection)
        const userId = userResult.insertId;

        // handle user-credentials
        const passwordHash = await passwordService.hashPassword(request.password);
        await userCredentialService.createUserCredential({
            user_id: userId,
            username: request.username,
            password_hash: passwordHash
        }, connection);

        // handle role assignments
        for (const role of user.roles) {
            let roleId = lookupService.getRoleId(role);
            await userRoleAssignmentService.createUserRoleAssignment(
                {
                    user_id: userId,
                    role_id: roleId
                },
                connection
            );
        }

        return userResult;
    });
}

/**
 * Updates a user
 * @param user_id 
 * @param user 
 * @returns 
 */
export const updateUser = async (user_id: number, request: UpdateUserRequest, connection?: PoolConnection) : Promise<OkPacket> => {
    if (connection)
        return await userDAO.updateUser(user_id, request, connection);
    return await userDAO.updateUser(user_id, request);
};

/**
 * Deletes a user
 * @param user_id 
 * @returns 
 */
export const deleteUser = async (user_id: number, connection?: PoolConnection) : Promise<OkPacket> => {
    if (connection)
        return await userDAO.deleteUser(user_id, connection);
    return await userDAO.deleteUser(user_id);
};