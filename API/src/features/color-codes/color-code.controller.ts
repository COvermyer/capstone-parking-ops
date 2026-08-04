/**
 * Author: Caleb Overmyer
 * Filename: color-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from 'express';
import * as colorCodeService from './color-code.service';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { AppError } from '../../common/errors/app.error';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getColorCodes: RequestHandler = async (req: Request, res: Response) => {
    const colorCodes = await colorCodeService.getColorCodes();
    return res.json(colorCodes);
};

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getColorCodeById: RequestHandler = async (req: Request, res: Response) => {
    const color_id = parseInt(req.params.color_id as string, 10);
    if (!color_id || isNaN(color_id)) {
        throw new AppError("Invalid color_id parameter", HTTP_STATUS.BAD_REQUEST);
    }

    const colorCode = await colorCodeService.getColorCode(color_id);
    return res.json(colorCode);
};

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getColorCodeByName: RequestHandler = async (req: Request, res: Response) => {
    const color_name = req.params.color_name as string;
    if (!color_name) {
        throw new AppError("Invalid color_name parameter", HTTP_STATUS.BAD_REQUEST);
    }
    const colorCode = await colorCodeService.getColorCodeByName(color_name);
    return res.json(colorCode);
};