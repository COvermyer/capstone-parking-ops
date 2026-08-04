/**
 * Author: Caleb Overmyer
 * Filename: state-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from 'express';
import * as stateCodeService from './state-code.service';
import { AppError } from '../../common/errors/app.error';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { asyncHandler } from '../../middleware/async-handler.middleware';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getAllStateCodes: RequestHandler = asyncHandler(async (req, res) => {
    const stateCodes = await stateCodeService.getAllStateCodes();
    return res.json(stateCodes);
});

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getStateCodeByStateId: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const state_id = parseInt(req.params.state_id as string, 10);
    if (!state_id || isNaN(state_id)) {
        throw new AppError("Invalid state_id parameter", HTTP_STATUS.BAD_REQUEST);
    }

    const stateCode = await stateCodeService.getStateCodeByStateId(state_id);
    return res.json(stateCode);
});

export const getStateCodeByStateName: RequestHandler = asyncHandler(async (req, res) => {
    const state_name = req.params.state_name as string;
    if (!state_name) {
        throw new AppError("Invalid state_name parameter", HTTP_STATUS.BAD_REQUEST);
    }

    const stateCode = await stateCodeService.getStateCodeByStateName(state_name);
    return res.json(stateCode);
});

export const getStateCodeByStateAbbreviation: RequestHandler = asyncHandler(async (req, res) => {
    const state_abbreviation = req.params.state_abbreviation as string;
    if (!state_abbreviation) {
        throw new AppError("Invalid state_abbreviation parameter", HTTP_STATUS.BAD_REQUEST);
    }

    const stateCode = await stateCodeService.getStateCodeByStateAbbreviation(state_abbreviation);
    return res.json(stateCode);
});