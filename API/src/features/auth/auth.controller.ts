/**
 * Author: Caleb Overmyer
 * Filename: auth.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        const result = await authService.login(username, password);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}