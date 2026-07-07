import { Router } from 'express';
import * as permitStatusCodeController from './permit-status-code.controller';

const router = Router();
router
    .route('/permit-status-codes')
    .get(permitStatusCodeController.getPermitStatusCodes);
router
    .route('/permit-status-codes/:status_code')
    .get(permitStatusCodeController.getPermitStatusCodeById);

export default router;