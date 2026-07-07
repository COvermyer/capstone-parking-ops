import { Request, RequestHandler, Response } from 'express';
import * as permitStatusCodeService from './permit-status-code.service';

export const getPermitStatusCodes: RequestHandler = async (req: Request, res: Response) => {
    try {
        const permitStatusCodes = await permitStatusCodeService.getPermitStatusCodes();
        console.log('[permitStatusCodeController][getPermitStatusCodes][Success]: ', permitStatusCodes);
        res.json(permitStatusCodes);
    } catch (error) {
        console.log('[permitStatusCodeController][getPermitStatusCodes][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch permit status codes' });
    }
};

export const getPermitStatusCodeById: RequestHandler = async (req: Request, res: Response) => {
    const status_code = req.params.status_code as string;
    try {
        const permitStatusCode = await permitStatusCodeService.getPermitStatusCode(status_code);
        console.log('[permitStatusCodeController][getPermitStatusCodeById][Success]: ', permitStatusCode[0]);
        res.json(permitStatusCode[0]); // Assuming the service returns an array, we send the first element
    } catch (error) {
        console.log('[permitStatusCodeController][getPermitStatusCodeById][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch permit status code' });
    }
};