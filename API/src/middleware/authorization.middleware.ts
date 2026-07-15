/**
 * Author: Caleb Overmyer
 * Filename: authorization.service.ts
 * Created: 2026-07-14
 * Last Modified: 2026-07-14
 * 
 * Middleware to enforce RBAC and deny access to resources that should be inaccessible to a given user
 */
import { Response, NextFunction } from "express";

import { AuthenticatedRequest } from "../features/auth/authenticated-request";
import * as AuthorizationService from "../services/authorization.service";

/**
 * 
 * @param roles an array of plaintext roles that can be permitted to access the endpoint
 * @returns 
 */
export const requiredRoles = (...roles: string[]) => {    
    return async(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Unauthorized or invalid credentials' });
            }

            const authorized = await AuthorizationService.hasRoles(req.user, roles);
            if (!authorized) {
                return res.status(403).json({ error: 'Forbidden' });
            }

            next();
        } catch (error) {
            next(error);
        }
    }
};