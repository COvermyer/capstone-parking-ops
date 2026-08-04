/**
 * Author: Caleb Overmyer
 * Filename: citation-status-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from "express";
import * as citationStatusCodeService from './citation-status-code.service';
import { asyncHandler } from "../../middleware/async-handler.middleware";
import { HTTP_STATUS } from "../../common/errors/error-codes";
import { AppError } from "../../common/errors/app.error";

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getCitationStatusCodes: RequestHandler = asyncHandler(async (req, res) => {
    const citationStatusCodes = await citationStatusCodeService.getCitationStatusCodes();
    return res.json(citationStatusCodes);
});

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getCitationStatusCodeById: RequestHandler = asyncHandler(async (req, res) => {
    const status_code = parseInt(req.params.status_code as string, 10);
    if (!status_code || isNaN(status_code)) {
        throw new AppError("Invalid status_code parameter", HTTP_STATUS.BAD_REQUEST);
    }

    const citationStatusCodes = await citationStatusCodeService.getCitationStatusCodeById(status_code);
    return res.json(citationStatusCodes);
});