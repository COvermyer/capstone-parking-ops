/**
 * Author: Caleb Overmyer
 * Filename: not-implemented.controller.ts
 * Created: 07/16/2026
 * 
 * A simple notImplemented controller method. This method acts as an insert for controller methods that have not yet been defined so
 * endpoint testing can be conducted without interruption. 
 */
import { RequestHandler, Request, Response } from "express";

export const notImplemented: RequestHandler = async (req: Request, res: Response) => {
    return res.status(501).json({ error: 'Not Yet Implemented' });
};