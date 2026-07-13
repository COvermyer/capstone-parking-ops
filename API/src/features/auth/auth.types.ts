/**
 * Author: Caleb Overmyer
 * Filename: auth.types.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { AuthenticatedUser } from "./authenticated-user";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: AuthenticatedUser
}