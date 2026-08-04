/**
 * Author: Caleb Overmyer
 * Filename: permit-status-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { RequestHandler } from 'express';
import * as permitStatusCodeService from './permit-status-code.service';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { AppError } from '../../common/errors/app.error';
import { asyncHandler } from '../../middleware/async-handler.middleware';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getPermitStatusCodes: RequestHandler = asyncHandler(async (req, res) => {
    const permitStatusCodes = await permitStatusCodeService.getPermitStatusCodes();
    return res.json(permitStatusCodes);
});

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getPermitStatusCodeById: RequestHandler = asyncHandler(async (req, res) => {
    const status_code = req.params.status_code as string;
    if (!status_code) {
        throw new AppError("Invalid status_code parameter", HTTP_STATUS.BAD_REQUEST);
    }

    const permitStatusCode = await permitStatusCodeService.getPermitStatusCode(status_code);
    return res.json(permitStatusCode);
});