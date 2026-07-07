import { Router } from 'express';
import * as userRoleAssignmentController from './user-role-assignment.controller';

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