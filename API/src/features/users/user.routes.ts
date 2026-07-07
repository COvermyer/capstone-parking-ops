import { Router } from 'express';
import * as userController from './user.controller';

const router = Router();
router
    .route('/users')
    .get(userController.getAllUsers);

router
    .route('/users/:user_id')
    .get(userController.getUserById);

export default router;