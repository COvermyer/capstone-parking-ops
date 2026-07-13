/**
 * Author: Caleb Overmyer
 * Filename: vehicle-make-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from 'express';
import { VehicleMakeCode } from './vehicle-make-code.model';
import * as vehicleMakeCodeService from './vehicle-make-code.service';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getVehicleMakeCodes: RequestHandler = async (req: Request, res: Response) => {
    try {
        const makeCodes = await vehicleMakeCodeService.getVehicleMakeCodes();
        console.log('[vehicleMakeController][getVehicleMakeCodes][Success]: ', makeCodes);
        res.status(200).json(makeCodes)
    } catch (error) {
        console.log('[vehicleMakeController][getVehicleMakeCodes][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch vehicle make codes' });
    }
}

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getVehicleMakeCode: RequestHandler = async (req: Request, res: Response) => {
    const makeId = parseInt(req.params.vehicle_make_id as string, 10);
    try {
        const makeCodes = await vehicleMakeCodeService.getVehicleMakeCodeById(makeId);
        console.log('[vehicleMakeController][getVehicleMakeCode][Success]: ', makeCodes[0]);
        res.status(200).json(makeCodes[0])
    } catch (error) {
        console.log('[vehicleMakeController][getVehicleMakeCode][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch vehicle make code' });
    }
}

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getVehicleMakeCodeByName: RequestHandler = async (req: Request, res: Response) => {
    const makeName = req.params.make_name as string;
    try {
        const makeCodes = await vehicleMakeCodeService.getVehicleMakeCodeByName(makeName);
        console.log('[vehicleMakeController][getVehicleMakeCodeByName][Success]: ', makeCodes[0]);
        res.status(200).json(makeCodes[0])
    } catch (error) {
        console.log('[vehicleMakeController][getVehicleMakeCodeByName][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch vehicle make code' });
    }
}