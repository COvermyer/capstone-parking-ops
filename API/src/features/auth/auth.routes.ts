import { Router } from 'express';
import * as authController from './auth.controller';

const router = Router();

router
    .route('/login')
    .post(authController.login);

export default router;