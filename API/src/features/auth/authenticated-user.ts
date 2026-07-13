/**
 * Author: Caleb Overmyer
 * Filename: authenticated-user.ts
 * Created: 07/06/2026
 * Last Updated: 07/13/2026
 */

/**
 * This interface enforces the contract of information exchanged with the front end once a user is issued a JWT token, 
 * and is given with the response. No protected information should be provided in the AuthenticatedUser module.
 */
export interface AuthenticatedUser {
    user_id: number;
    company_id: number;
    username: string;
    first_name: string;
    last_name: string;
    roles: string[];
    email: string;
}