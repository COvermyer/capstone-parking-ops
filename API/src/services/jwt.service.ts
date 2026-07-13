import jwt from 'jsonwebtoken';
import { AuthenticatedUser } from "../types/authenticated-user"

const jwtConfig = {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
}

export const generateToken = (user: AuthenticatedUser): string => {
    return jwt.sign(
        user,
        process.env.JWT_SECRET!,
        {
            expiresIn: (process.env.JWT_EXPIRES_IN || "1h") as jwt.SignOptions["expiresIn"]
        }
    );
};

export const verifyToken = (token: string): AuthenticatedUser => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET!
    ) as AuthenticatedUser;
};