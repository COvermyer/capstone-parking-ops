/**
 * Author: Caleb Overmyer
 * Filename: citation-status-code.routes.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Router } from 'express';
import * as citationStatusController from './citation-status-code.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();
router
    .route('/citation-status')
    .get(citationStatusController.getCitationStatusCodes);
router
    .route('/citation-status/:status_code')
    .get(citationStatusController.getCitationStatusCodeById);

export default router;