export interface UserCredential {
    user_id: number;
    username: string;
    password_hash: string;
    salt_value: string;
}