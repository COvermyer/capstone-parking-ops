/**
 * Author: Caleb Overmyer
 * Filename: user-role-assignment.router.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Router } from 'express';
import * as userRoleAssignmentController from './user-role-assignment.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();
router
    .route('/user-role-assignments')
    .get(userRoleAssignmentController.getUserRoleAssignments);

router
    .route('/user-role-assignments/user/:user_id')
    .get(userRoleAssignmentController.getUserRoleAssignmentsByUserId);

router
    .route('/user-role-assignments/role/:role_id')
    .get(userRoleAssignmentController.getUserRoleAssignmentsByRoleId);

export default router;