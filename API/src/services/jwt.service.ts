/**
 * Author: Caleb Overmyer
 * Filename: jwt.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/13/2026
 * 
 * Acts as the JWT generation and verification source of truth
 */
import jwt from 'jsonwebtoken';
import { AuthenticatedUser } from "../features/auth/authenticated-user"

/**
 * Defines the necessary constants for JWT generation
 */
const jwtConfig = {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
}

/**
 * Generates a unique JWT token
 * @param user The AuthenticatedUser that will be passed to front end with the token for reference.
 * @returns A signed JWT token with an attached AuthenticatedUser
 */
export const generateToken = (user: AuthenticatedUser): string => {
    return jwt.sign(
        user,
        process.env.JWT_SECRET!,
        {
            expiresIn: (process.env.JWT_EXPIRES_IN || "1h") as jwt.SignOptions["expiresIn"]
        }
    );
};

/**
 * Verifies a JWT token's authenticity
 * @param token The token to verify
 * @returns An AuthenticatedUser object associated with a JWT
 */
export const verifyToken = (token: string): AuthenticatedUser => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET!
    ) as AuthenticatedUser;
};