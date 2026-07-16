import { RequestHandler, Request, Response } from "express";


export const notImplemented: RequestHandler = async (req: Request, res: Response) => {
    return res.status(501).json({ error: 'Not Yet Implemented' });
};