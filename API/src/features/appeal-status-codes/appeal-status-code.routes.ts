import { Router } from 'express';
import * as appealStatusCodeController from './appeal-status-code.controller';

const router = Router();

router
    .route('/appeal-status-codes')
    .get(appealStatusCodeController.getAppealStatusCodes);

router
    .route('/appeal-status-codes/:appeal_status_code')
    .get(appealStatusCodeController.getAppealStatusCodeById);

export default router;