import { Router } from 'express';
import * as citationOffenseCodeController from './citation-offense-code.controller';

const router = Router();
router
    .route('/citation-offense-codes')
    .get(citationOffenseCodeController.getCitationOffenseCodes);
router
    .route('/citation-offense-codes/:offense_code_id')
    .get(citationOffenseCodeController.getCitationOffenseCodeById);

export default router;
