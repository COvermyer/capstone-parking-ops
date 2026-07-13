/**
 * Author: Caleb Overmyer
 * Filename: user.model.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export interface User {
    user_id: number;
    company_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    created: string;
    roles: string[];
}