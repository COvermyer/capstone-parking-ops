/**
 * Author: Caleb Overmyer
 * Filename: permit-status-code.routes.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Router } from 'express';
import * as permitStatusCodeController from './permit-status-code.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();
router
    .route('/permit-status-codes')
    .get(permitStatusCodeController.getPermitStatusCodes);
router
    .route('/permit-status-codes/:status_code')
    .get(permitStatusCodeController.getPermitStatusCodeById);

export default router;