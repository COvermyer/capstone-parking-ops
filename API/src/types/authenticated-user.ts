export interface AuthenticatedUser {
    user_id: number;
    company_id: number;
    username: string;
    first_name: string;
    last_name: string;
    roles: string[];
    email: string;
}