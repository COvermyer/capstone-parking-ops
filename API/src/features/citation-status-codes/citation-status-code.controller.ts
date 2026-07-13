/**
 * Author: Caleb Overmyer
 * Filename: citation-status-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from "express";
import * as citationStatusCodeService from './citation-status-code.service';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getCitationStatusCodes: RequestHandler = async (req: Request, res: Response) => {
    try {
        const citationStatusCodes = await citationStatusCodeService.getCitationStatusCodes();
        console.log('[citation-status-code.controller][getCitationStatusCodes][Success]: ', citationStatusCodes);
        res.status(200).json(citationStatusCodes)
    } catch (error) {
        console.log('[citation-status-code.controller][getCitationStatusCodes][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch citation offense codes' });
    }
};

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getCitationStatusCodeById: RequestHandler = async (req: Request, res: Response) => {
    const status_code = parseInt(req.params.status_code as string, 10);
    try {
        const citationStatusCodes = await citationStatusCodeService.getCitationStatusCodeById(status_code);
        console.log('[citation-status-code.controller][getCitationStatusCodeById][Success]: ', citationStatusCodes[0]);
        res.status(200).json(citationStatusCodes[0])
    } catch (error) {
        console.log('[citation-status-code.controller][getCitationStatusCodeById][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch citation offense codes' });
    }
};