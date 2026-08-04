/**
 * Author: Caleb Overmyer
 * Filename: appeal-status-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from 'express';
import * as appealStatusCodeService from './appeal-status-code.service';
import { AppError } from '../../common/errors/app.error';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { asyncHandler } from '../../middleware/async-handler.middleware';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getAppealStatusCodes: RequestHandler = asyncHandler(async (req, res) => {
    const appealStatusCodes = await appealStatusCodeService.getAppealStatusCodes();
    return res.json(appealStatusCodes);
});

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getAppealStatusCodeById: RequestHandler = asyncHandler(async (req, res) => {
    const appeal_status_code = parseInt(req.params.appeal_status_code as string, 10);
    if (!appeal_status_code || isNaN(appeal_status_code)) {
        throw new AppError(`Invalid appeal_status_code parameter`, HTTP_STATUS.BAD_REQUEST);
    }
    const appealStatusCode = await appealStatusCodeService.getAppealStatusCode(appeal_status_code);
    return res.json(appealStatusCode[0]);
});