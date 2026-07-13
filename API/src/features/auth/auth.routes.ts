/**
 * Author: Caleb Overmyer
 * Filename: auth.routes.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Router } from 'express';
import * as authController from './auth.controller';

const router = Router();

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
router
    .route('/login')
    .post(authController.login);

export default router;