import { Router } from 'express';
import * as citationStatusController from './citation-status-code.controller';

const router = Router();
router
    .route('/citation-status')
    .get(citationStatusController.getCitationStatusCodes);
router
    .route('/citation-status/:status_code')
    .get(citationStatusController.getCitationStatusCodeById);

export default router;