/**
 * Author: Caleb Overmyer
 * Filename: state-code.routes.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Router } from 'express';
import * as stateCodeController from './state-code.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();
router
    .route('/state-codes')
    .get(stateCodeController.getAllStateCodes);

router
    .route('/state-codes/id/:state_id')
    .get(stateCodeController.getStateCodeByStateId);

router
    .route('/state-codes/name/:state_name')
    .get(stateCodeController.getStateCodeByStateName);

router
    .route('/state-codes/abbreviation/:state_abbreviation')
    .get(stateCodeController.getStateCodeByStateAbbreviation);

export default router;