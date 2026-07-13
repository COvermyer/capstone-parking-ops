/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-code.routes.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Router } from 'express';
import * as citationOffenseCodeController from './citation-offense-code.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();
router
    .route('/citation-offense-codes')
    .get(citationOffenseCodeController.getCitationOffenseCodes);
router
    .route('/citation-offense-codes/:offense_code_id')
    .get(citationOffenseCodeController.getCitationOffenseCodeById);

export default router;
