/**
 * Author: Caleb Overmyer
 * Filename: auth.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import * as userCredentialService from '../user-credentials/user-credential.service';
import { AuthenticatedRequest } from './authenticated-request';
import { AppError } from '../../common/errors/app.error';
import { HTTP_STATUS } from '../../common/errors/error-codes';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new AppError(`Invalid request body`, HTTP_STATUS.BAD_REQUEST);
    }

    
    try {
        const result = await authService.login(username, password);
        return res.json(result);
    } catch (error) {
        next(error);
    }
};

// export const logout = async (req: Request, res: Response, next: NextFunction) => {};

// export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {};

export const changeCredentials: RequestHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        await userCredentialService.updateAuthenticatedUserCredential(req.user!.user_id, req.body);
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};