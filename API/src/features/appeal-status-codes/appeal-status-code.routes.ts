/**
 * Author: Caleb Overmyer
 * Filename: appeal-status-code.routes.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Router } from 'express';
import * as appealStatusCodeController from './appeal-status-code.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();
router
    .route('/appeal-status-codes')
    .get(appealStatusCodeController.getAppealStatusCodes);

router
    .route('/appeal-status-codes/:appeal_status_code')
    .get(appealStatusCodeController.getAppealStatusCodeById);

export default router;