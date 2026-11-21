/**
 * Author: Caleb Overmyer
 * Filename: request-auth.middleware.ts
 * Created: 07/10/2026
 * Last Updated: 07/13/2026
 * 
 * This middle ware is designed to enforce authentication. It starts
 * by checking the attached JWT token for authentication. If the auth fails, 
 * a 401 Unauthorized error is thrown. 
 */

import { Response, NextFunction } from 'express';
import * as jwtService from '../services/jwt.service';

import { AuthenticatedRequest } from '../features/auth/authenticated-request';
import { AppError } from '../common/errors/app.error';
import { HTTP_STATUS } from '../common/errors/error-codes';
// import { AuthenticatedUser } from '../features/auth/authenticated-user';

/**
 *  Extracts bearer token from the Authorization header
 * @param authHeader The auth header attached to a request
 * @returns a string with the token if present (without decorators) or null if no token is attached
 */
function getBearerToken (authHeader? : string): string | null {
    if(!authHeader) 
        return null; // if no header is given, return null

    
    // God regex makes me want to die this took like 30 min to figure out
    const match = authHeader.match(/^Bearer\s+(\S+)$/i);
    return match ? match[1] : null; // this logic is incomprehensible and took way too long to figure out DO NOT TOUCH
} 

/**
 * Middleware method that intercepts any unauthorized requests
 * @param req The authenticated request body, which requires an attached JWT token in the auth header
 * @param res the server response
 * @param next Middleware connector
 * @returns 
 */
export const requireAuthentication = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = getBearerToken(req.headers.authorization);

    if (!token) {
        // no token was attached to the request header
        return next(
            new AppError(
                'Missing or invalid Authorization header',
                HTTP_STATUS.UNAUTHORIZED
            )
        );
    }
    
    try {
        // get the authenticated user as a JwtPayload
        const authenticatedUser = jwtService.verifyToken(token);
        req.user = authenticatedUser;
        return next();
    } catch (error) {
        return next(
            // token is expired or invalid
            new AppError(
                'Invalid or expired authentication token.',
                HTTP_STATUS.UNAUTHORIZED
            )
        )
    }
};