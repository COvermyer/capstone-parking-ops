/**
 * Author: Caleb Overmyer
 * Filename: user.model.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */

/**
 * Defines the contract for a User object, joined with the user_role_assignments table with the `roles` field
 */
export interface User {
    user_id: number;
    company_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    created?: string;
    roles: string[];
};

/**
 * Defines the contract for a CreateUserRequest, including all data necessary to add a user to the database
 */
export interface CreateUserRequest {
    // User information
    company_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;

    // User Credentials
    username: string;
    password: string;
};

/**
 * Defines the contract for an UpdateUserRequest, allowing field exclusion for partial/PATCH updates
 */
export interface UpdateUserRequest {
    // User information
    company_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;

    // User Credentials
    // username: string;
    // password: string;
};