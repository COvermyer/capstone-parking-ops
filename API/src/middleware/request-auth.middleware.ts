/**
 * This middle ware is designed to enforce role-based access. It starts
 * by checking the attached JWT token for authorization. If the auth fails, 
 * a 403 Unauthorized error is thrown. 
 */
import { Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
import * as jwtService from '../services/jwt.service';

import { AuthenticatedRequest } from '../types/authenticated-request';
// import { AuthenticatedUser } from '../types/authenticated-user';

function getBearerToken (authHeader? : string): string | null {
    if(!authHeader) 
        return null; // if no header is given, return null

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer")
        return null; // If the first half of the scheme is in an unexpected format, return null

    return token; // return only the token value
} 

export const requireAuthentication = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = getBearerToken(req.headers.authorization);

    if (!token) {
        // no token was attached to the request header
        return res.status(401).json({ 
            message: 'Missing or invalid Authorization header.' 
        });
    }

    try {
        const authenticatedUser = jwtService.verifyToken(token); // verify the token
        req.user = authenticatedUser; // attach the authenticated user to the request body
        next(); // continue past the middleware 

    } catch (error) {
        // Unable to validate token due to expiration or invalidity
        return res.status(401).json({
            message: 'Invalid or expired token.'
        })
    }
};