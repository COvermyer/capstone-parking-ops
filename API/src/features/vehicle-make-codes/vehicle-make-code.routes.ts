import { Router } from "express";
import * as vehicleMakeCodeController from './vehicle-make-code.controller';

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