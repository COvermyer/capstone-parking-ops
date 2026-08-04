/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { RequestHandler} from "express";
import * as offenseStatusCodeService from './citation-offense-code.service';
import { HTTP_STATUS } from "../../common/errors/error-codes";
import { AppError } from "../../common/errors/app.error";
import { asyncHandler } from "../../middleware/async-handler.middleware";

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getCitationOffenseCodes: RequestHandler = asyncHandler(async (req, res) => {
    const offenseStatusCodes = await offenseStatusCodeService.getCitationOffenseCodes();
    return res.json(offenseStatusCodes);
});

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getCitationOffenseCodeById: RequestHandler = asyncHandler(async (req, res) => {
    const offense_code_id = parseInt(req.params.offense_code_id as string, 10);
    if (!offense_code_id || isNaN(offense_code_id)) {
        throw new AppError("Invalid offense_code_id parameter", HTTP_STATUS.BAD_REQUEST);
    }

    const offenseStatusCodes = await offenseStatusCodeService.getCitationOffenseCodeById(offense_code_id);
    return res.json(offenseStatusCodes);
});