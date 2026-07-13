/**
 * Author: Caleb Overmyer
 * Filename: user-role-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from 'express';
import * as userRoleCodeService from './user-role-code.service';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getUserRoleCodes: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userRoles = await userRoleCodeService.getUserRoles();
        console.log('[userRoleCodeController][getUserRolesCodes][Success]: ', userRoles);
        res.status(200).json(userRoles);
    } catch (error) {
        console.log('[userRoleCodeController][getUserRolesCodes][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch user roles' });
    }
};

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getUserRoleCodeById: RequestHandler = async (req: Request, res: Response) => {
    const role_id = parseInt(req.params.role_id as string, 10);
    try {
        const userRole = await userRoleCodeService.getUserRole(role_id);
        console.log('[userRoleCodeController][getUserRoleCodeById][Success]: ', userRole[0]);  
        res.status(200).json(userRole[0]); // Assuming the service returns an array, we send the first element
    } catch (error) {
        console.log('[userRoleCodeController][getUserRoleCodeById][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch user role' });
    }
};
