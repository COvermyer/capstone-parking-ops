import { Router } from 'express';
import * as userRoleCodeController from './user-role-code.controller';

const router = Router();
router
    .route('/user-roles')
    .get(userRoleCodeController.getUserRoleCodes);
    
router
    .route('/user-roles/:role_id')
    .get(userRoleCodeController.getUserRoleCodeById);

export default router;