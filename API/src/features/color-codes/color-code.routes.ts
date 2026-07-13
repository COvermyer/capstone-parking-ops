/**
 * Author: Caleb Overmyer
 * Filename: color-code.routes.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Router } from 'express';
import * as colorCodeController from './color-code.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();
router
    .route('/color-codes')
    .get(colorCodeController.getColorCodes);
router
    .route('/color-codes/:color_id')
    .get(colorCodeController.getColorCodeById);
router
    .route('/color-codes/name/:color_name')
    .get(colorCodeController.getColorCodeByName);

export default router;
