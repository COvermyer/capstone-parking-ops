/**
 * Author: Caleb Overmyer
 * Filename: user-role-assignment.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from 'express';
import * as userRoleAssignmentService from './user-role-assignment.service';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getUserRoleAssignments: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userRoleAssignments = await userRoleAssignmentService.getUserRoleAssignments();
        console.log('[userRoleAssignmentController][getUserRoleAssignments][Success]: ', userRoleAssignments);  
        res.json(userRoleAssignments);
    } catch (error) {
        console.log('[userRoleAssignmentController][getUserRoleAssignments][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch user role assignments' });
    }
};

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getUserRoleAssignmentsByUserId: RequestHandler = async (req: Request, res: Response) => {
    const user_id = parseInt(req.params.user_id as string, 10);
    try {
        const userRoleAssignments = await userRoleAssignmentService.getUserRoleAssignmentsByUserId(user_id);
        console.log('[userRoleAssignmentController][getUserRoleAssignmentsByUserId][Success]: ', userRoleAssignments);
        res.json(userRoleAssignments);
    } catch (error) {
        console.log('[userRoleAssignmentController][getUserRoleAssignmentsByUserId][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch user role assignments' });
    }
};

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getUserRoleAssignmentsByRoleId: RequestHandler = async (req: Request, res: Response) => {
    const role_id = parseInt(req.params.role_id as string, 10);
    try {
        const userRoleAssignments = await userRoleAssignmentService.getUserRoleAssignmentsByRoleId(role_id);
        console.log('[userRoleAssignmentController][getUserRoleAssignmentsByRoleId][Success]: ', userRoleAssignments);
        res.json(userRoleAssignments);
    } catch (error) {
        console.log('[userRoleAssignmentController][getUserRoleAssignmentsByRoleId][Error]: ', error);
        res.status(500).json({ error: 'Failed to fetch user role assignments' });
    }
};