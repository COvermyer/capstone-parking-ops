/**
 * Author: Caleb Overmyer
 * Filename: user.dao.ts
 * Created: 2024-06-10
 * Last Modified: 2024-06-10
 * 
 * Description: 
 * This file contains the data access object (DAO) functions for the User entity. 
 * It provides methods to interact with the database and perform CRUD operations related to users.
 * The functions in this file utilize the MySQL connector to execute SQL queries defined in the user.queries.ts file.
 * This file is part of the API layer of the application and serves as an intermediary between the service layer and the database.
 * This file is the only point of contact with the database for the User entity, ensuring that all database interactions are centralized and maintainable.
 */
import { OkPacket, PoolConnection } from "mysql";
import { execute, executeWithConnection } from '../../services/mysql.connector'
import { UpdateUserRequest, User } from './user.model';
import { buildUpdateUserQuery, userQueries } from './user.queries';
import { UpdateQuery } from "../../types/update-query.model";

/**
 * 
 * @returns a promise that resolves to an array of User entities. If no users are found, the promise resolves to an empty array.
 * 
 * This function executes a SQL query to retrieve all user records from the database. 
 * It uses the execute function from the MySQL connector service to perform the query defined in user.queries.ts.
 * The result is typed as an array of User objects, ensuring type safety and consistency with the User model defined in user.model.ts.
 */
export const readUsers = async () => {
    return execute<User[]>(userQueries.getAllUsers, []);
};

export const readUsersPaginated = async (page: number, pageSize: number) => {
    return execute<User[]>(userQueries.getUsersPaginated, [pageSize, ((page - 1) * pageSize)]);
};

/**
 * 
 * @param user_id 
 * @returns A promise that resolves to any User entities that have the specified user_id. If no users are found, the promise resolves to an empty array.
 * 
 * This function executes a SQL query to retrieve user records from the database based on the provided user_id. 
 * It uses the execute function from the MySQL connector service to perform the query defined in user.queries.ts.
 * The result is typed as an array of User objects, ensuring type safety and consistency with the User model defined in user.model.ts.
 */
export const readUserById = async (user_id: number) => {
    return execute<User[]>(userQueries.getUserById, [user_id]);
};

export const readUserByUsername = async (username: string) => {
    return execute<User[]>(userQueries.getUserByUsername, [username]);
};

export const createUser = async (user: User, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<OkPacket>(connection, userQueries.createUser, [user.company_id, user.first_name, user.last_name, user.email, user.phone_number])
    return execute<OkPacket>(userQueries.createUser, [user.company_id, user.first_name, user.last_name, user.email, user.phone_number]);
};

// export const updateUser = async (user_id: number, user: User, connection?: PoolConnection) => {
//     if (connection)
//         return executeWithConnection<OkPacket>(connection, userQueries.updateUser, [user.company_id, user.first_name, user.last_name, user.email, user.phone_number, user_id]);
//     return execute<OkPacket>(userQueries.updateUser, [user.company_id, user.first_name, user.last_name, user.email, user.phone_number, user_id]);
// };

export const updateUser = async (user_id: number, updateRequest: UpdateUserRequest, connection?: PoolConnection) => {
    const updateQuery: UpdateQuery = buildUpdateUserQuery(user_id, updateRequest);
    if (connection)
        return executeWithConnection<OkPacket>(connection, updateQuery.sql, updateQuery.values);
    return execute<OkPacket>(updateQuery.sql, updateQuery.values);
};

export const deleteUser = async (user_id: number, connection?: PoolConnection) => {
    if (connection)
        return executeWithConnection<OkPacket>(connection, userQueries.deleteUserByUserId, [user_id])
    return execute<OkPacket>(userQueries.deleteUserByUserId, [user_id]);
};
