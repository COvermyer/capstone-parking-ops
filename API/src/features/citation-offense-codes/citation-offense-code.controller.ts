import { Request, RequestHandler, Response } from "express";
import * as offenseStatusCodeService from './citation-offense-code.service';

export const getCitationOffenseCodes: RequestHandler = async (req: Request, res: Response) => {
    try {
        const offenseStatusCodes = await offenseStatusCodeService.getCitationOffenseCodes();
        console.log('[citation-offense-code.controller][getCitationOffenseCode][Success]: ', offenseStatusCodes);
        res.status(200).json(offenseStatusCodes)
    } catch (error) {
        console.log('[citation-offense-code.controller][getCitationOffenseCode][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch citation offense codes' });
    }
};

export const getCitationOffenseCodeById: RequestHandler = async (req: Request, res: Response) => {
    const offense_code_id = parseInt(req.params.offense_code_id as string, 10);
    try {
        const offenseStatusCodes = await offenseStatusCodeService.getCitationOffenseCodeById(offense_code_id);
        console.log('[citation-offense-code.controller][getCitationOffenseCodeById][Success]: ', offenseStatusCodes[0]);
        res.status(200).json(offenseStatusCodes[0])
    } catch (error) {
        console.log('[citation-offense-code.controller][getCitationOffenseCodeById][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch citation offense codes' });
    }
};