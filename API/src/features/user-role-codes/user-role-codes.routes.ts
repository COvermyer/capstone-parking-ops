/**
 * Author: Caleb Overmyer
 * Filename: user-role-code.routes.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Router } from 'express';
import * as userRoleCodeController from './user-role-code.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();
router
    .route('/user-roles')
    .get(userRoleCodeController.getUserRoleCodes);
    
router
    .route('/user-roles/:role_id')
    .get(userRoleCodeController.getUserRoleCodeById);

export default router;