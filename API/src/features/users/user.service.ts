/**
 * Author: Caleb Overmyer
 * Filename: user.model.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as userDAO from './user.dao';
import * as userRoleAssignmentService from '../user-role-assignments/user-role-assignment.service';
import * as userCredentialService from '../user-credentials/user-credential.service';
import * as passwordService from '../../services/password.service';
import lookupService from '../../services/lookup.service';
import { User, CreateUserRequest, UpdateUserRequest } from './user.model';
import { OkPacket, PoolConnection } from 'mysql';
import { transaction } from '../../services/mysql.connector';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { AppError } from '../../common/errors/app.error';

/**
 * Get all method for Users
 * @returns a Promise for User array
 */
export const getAllUsers = async (): Promise<User[]> => {
    const users = await userDAO.readUsers();
    if (users.length === 0) {
        throw new AppError("No users found", HTTP_STATUS.NOT_FOUND);
    }

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
    // console.log(`SERVICE USERS: ${JSON.stringify(users)}`); // DEBUGGING
    if (users.length === 0) {
        // console.log(`[user.service][getUsersPaginated][Not Found] Throwing AppError for no users found`);
        throw new AppError("No users found", HTTP_STATUS.NOT_FOUND);
    }

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
    if (users.length === 0) { // 404 response if no user found
        throw new AppError(`User with ID ${user_id} not found`, HTTP_STATUS.NOT_FOUND);
    }

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
    if (users.length === 0) { // 404 response if no user found
        throw new AppError(`User with username ${username} not found`, HTTP_STATUS.NOT_FOUND);
    }

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
export const createUser = async (
    request: CreateUserRequest,
    connection?: PoolConnection
) : Promise<OkPacket> => {
    // if a connection is provided, use it; otherwise, create a new transaction
    if (connection) {
        return createUserInternal(request, connection);
    }

    return transaction(async (connection) => {
        return createUserInternal(request, connection);
    })
}

const createUserInternal = async (
    request: CreateUserRequest,
    connection: PoolConnection
) : Promise<OkPacket> => {
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
    if (!userId) { // 500 response if user creation fails // FIXME: may have a better status code for this, but 500 is a safe fallback
        throw new AppError("Failed to create user", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
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
};

/**
 * Updates a user
 * @param user_id 
 * @param user 
 * @returns 
 */
export const updateUser = async (user_id: number, request: UpdateUserRequest, connection?: PoolConnection) : Promise<OkPacket> => {
    const user = await userDAO.readUserById(user_id, connection);  // check the user exists first
    if (user.length === 0) {
        throw new AppError(`User with ID ${user_id} not found`, HTTP_STATUS.NOT_FOUND);
    }
    return await userDAO.updateUser(user_id, request, connection);
};

/**
 * Deletes a user
 * FIXME: needs to be refactored to handle deletion of user-credentials and user-role-assignments in a transaction. Currently, it only deletes the user record.
 * Fails on any dependencies due to foreign key constraints. This is a known issue and will be addressed in a future update.
 * @param user_id 
 * @returns 
 */
export const deleteUser = async (user_id: number, connection?: PoolConnection) : Promise<OkPacket> => {
    const user = await userDAO.readUserById(user_id, connection);  // check the user exists first
    if (user.length === 0) {
        throw new AppError(`User with ID ${user_id} not found`, HTTP_STATUS.NOT_FOUND);
    }
    return await userDAO.deleteUser(user_id, connection);
};