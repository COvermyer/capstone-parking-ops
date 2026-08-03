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
import { AppError } from "../common/errors/app.error";
import { HTTP_STATUS } from "../common/errors/error-codes";

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
                // pass errors to error handler middleware
                throw new AppError('Unauthorized or invalid credentials', HTTP_STATUS.UNAUTHORIZED);
            }

            const authorized = await AuthorizationService.hasRoles(req.user, roles);
            if (!authorized) {
                throw new AppError('Forbidden', HTTP_STATUS.FORBIDDEN);
            }

            next();
        } catch (error) {
            next(error);
        }
    }
};