import { Router } from 'express';
import * as userController from './user.controller';
import { requireAuthentication } from '../../middleware/request-auth.middleware';

const router = Router();
router.get(
    '/users',
    requireAuthentication,
    userController.getAllUsers
);

router
    .route('/users/:user_id')
    .get(userController.getUserById);

export default router;