/**
 * This middle ware is designed to enforce role-based access. It starts
 * by checking the attached JWT token for authorization. If the auth fails, 
 * a 403 Unauthorized error is thrown. 
 */
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthenticatedRequest } from '../types/authenticated-request';
import { AuthenticatedUser } from '../types/authenticated-user';

function getBearerToken (authHeader? : string): string | null {
    if(!authHeader) 
        return null; // if no header is given, return null

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer")
        return null; // If the first half of the scheme is in an unexpected format, return null

    return token; // return only the token value
} 

export const authenticatedRequest = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // missing header
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization Header Missing' });
    }

    // Should Be: `Bearer <token>`
    const parts = authHeader.split(" ");

    // ensure that the expected format is received
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: 'Invalid authorization header' });
    }

    const token = getBearerToken(authHeader);

    if (!token) {
        res.status(401).json({ message: "Unauthorized or Invalid Token" });
    }

    const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET!
    );

    req.user = decoded as AuthenticatedUser;
    next();
}