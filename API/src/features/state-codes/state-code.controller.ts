import { Request, RequestHandler, Response } from 'express';
import * as stateCodeService from './state-code.service';

export const getAllStateCodes: RequestHandler = async (req: Request, res: Response) => {
    try {
        const stateCodes = await stateCodeService.getAllStateCodes();
        console.log('[stateCodeController][getAllStateCodes][Success]: ', stateCodes);
        res.json(stateCodes);
    } catch (error) {
        console.log('[stateCodeController][getAllStateCodes][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch state codes' });
    }
};

export const getStateCodeByStateId: RequestHandler = async (req: Request, res: Response) => {
    const state_id = parseInt(req.params.state_id as string, 10);
    try {
        const stateCode = await stateCodeService.getStateCodeByStateId(state_id);
        console.log('[stateCodeController][getStateCodeByStateId][Success]: ', stateCode[0]);
        res.json(stateCode[0]); // Assuming the service returns an array, we send the first element
    } catch (error) {
        console.log('[stateCodeController][getStateCodeByStateId][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch state code' });
    }
};

export const getStateCodeByStateName: RequestHandler = async (req: Request, res: Response) => {
    const state_name = req.params.state_name as string;
    try {
        const stateCode = await stateCodeService.getStateCodeByStateName(state_name);
        console.log('[stateCodeController][getStateCodeByStateName][Success]: ', stateCode[0]);
        res.json(stateCode[0]); // Assuming the service returns an array, we send the first element
    } catch (error) {
        console.log('[stateCodeController][getStateCodeByStateName][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch state code' });
    }
};

export const getStateCodeByStateAbbreviation: RequestHandler = async (req: Request, res: Response) => {
    const state_abbreviation = req.params.state_abbreviation as string;
    try {
        const stateCode = await stateCodeService.getStateCodeByStateAbbreviation(state_abbreviation);
        console.log('[stateCodeController][getStateCodeByStateAbbreviation][Success]: ', stateCode[0]);
        res.json(stateCode[0]); // Assuming the service returns an array, we send the first element
    } catch (error) {
        console.log('[stateCodeController][getStateCodeByStateAbbreviation][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch state code' });
    }
};