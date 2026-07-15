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
}