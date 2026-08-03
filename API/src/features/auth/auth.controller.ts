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

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        const result = await authService.login(username, password);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// export const logout = async (req: Request, res: Response, next: NextFunction) => {};

// export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {};

export const changeCredentials: RequestHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        await userCredentialService.updateAuthenticatedUserCredential(req.user!.user_id, req.body);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};