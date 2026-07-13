/**
 * Author: Caleb Overmyer
 * Filename: appeal-status-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from 'express';
import * as appealStatusCodeService from './appeal-status-code.service';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getAppealStatusCodes: RequestHandler = async (req: Request, res: Response) => {
    try {
        const appealStatusCodes = await appealStatusCodeService.getAppealStatusCodes();
        console.log('[appealStatusCodeController][getAppealStatusCodes][Success]: ', appealStatusCodes);
        res.json(appealStatusCodes);
    } catch (error) {
        console.log('[appealStatusCodeController][getAppealStatusCodes][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch appeal status codes' });
    }
};

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getAppealStatusCodeById: RequestHandler = async (req: Request, res: Response) => {
    const appeal_status_code = parseInt(req.params.appeal_status_code as string, 10);
    try {
        const appealStatusCode = await appealStatusCodeService.getAppealStatusCode(appeal_status_code);
        console.log('[appealStatusCodeController][getAppealStatusCodeById][Success]: ', appealStatusCode[0]);
        res.json(appealStatusCode[0]); // Assuming the service returns an array, we send the first element
    } catch (error) {
        console.log('[appealStatusCodeController][getAppealStatusCodeById][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch appeal status code' });
    }
};