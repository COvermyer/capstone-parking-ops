/**
 * Author: Caleb Overmyer
 * Filename: auth.routes.ts
 * Created: 07/10/2026
 * Last Updated: 07/15/2026
 */
import { Router } from 'express';
import * as authController from './auth.controller';
import { loginRateLimiter } from '../../middleware/rate-limit.middleware';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();

router.post(
    '/login',
    loginRateLimiter,
    authController.login
);

export default router;