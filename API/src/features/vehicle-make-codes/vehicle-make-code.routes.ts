/**
 * Author: Caleb Overmyer
 * Filename: vehicle-make-code.routes.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Router } from "express";
import * as vehicleMakeCodeController from './vehicle-make-code.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();
router
    .route('/vehicle-make-codes')
    .get(vehicleMakeCodeController.getVehicleMakeCodes);

router
    .route('/vehicle-make-codes/:make_id')
    .get(vehicleMakeCodeController.getVehicleMakeCode);

router
    .route('/vehicle-make-codes/make/:make_name')
    .get(vehicleMakeCodeController.getVehicleMakeCodeByName);

export default router;