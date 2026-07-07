import { Router } from 'express';
import * as colorCodeController from './color-code.controller';

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
