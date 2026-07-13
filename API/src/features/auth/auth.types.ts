import { AuthenticatedUser } from "../../types/authenticated-user";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: AuthenticatedUser
}