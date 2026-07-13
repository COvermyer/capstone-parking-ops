/**
 * Author: Caleb Overmyer
 * Filename: color-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from 'express';
import * as colorCodeService from './color-code.service';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getColorCodes: RequestHandler = async (req: Request, res: Response) => {
    try {
        const colorCodes = await colorCodeService.getColorCodes();
        console.log('[colorCodeController][getColorCodes][Success]: ', colorCodes);
        res.json(colorCodes);
    } catch (error) {
        console.log('[colorCodeController][getColorCodes][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch color codes' });
    }
};

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getColorCodeById: RequestHandler = async (req: Request, res: Response) => {
    const color_id = parseInt(req.params.color_id as string, 10);
    try {
        const colorCode = await colorCodeService.getColorCode(color_id);
        console.log('[colorCodeController][getColorCodeById][Success]: ', colorCode[0]);
        res.json(colorCode[0]); // Assuming the service returns an array, we send the first element
    } catch (error) {
        console.log('[colorCodeController][getColorCodeById][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch color code' });
    }
};

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getColorCodeByName: RequestHandler = async (req: Request, res: Response) => {
    const color_name = req.params.color_name as string;
    try {
        const colorCode = await colorCodeService.getColorCodeByName(color_name);
        console.log('[colorCodeController][getColorCodeByName][Success]: ', colorCode[0]);
        res.json(colorCode[0]); // Assuming the service returns an array, we send the first element
    } catch (error) {
        console.log('[colorCodeController][getColorCodeByName][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch color code' });
    }
};