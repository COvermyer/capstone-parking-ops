/**
 * Author: Caleb Overmyer
 * Filename: user-role-assignment.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from 'express';
import * as userRoleAssignmentService from './user-role-assignment.service';
import { UserRoleAssignment } from './user-role-assignment.model';

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

export const deleteAllRolesFromUserById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id as string, 10);
        if (Number.isNaN(userId)) {
            // 400 Invalid Response
            console.log(`[user-role-assignment.controller][deleteAllRolesFromUserById][Error] Invalid User ID: ${req.params.user_id as string}`);
            return res.status(400).json({ error: 'Invalid User ID' });
        }

        const okPacket = await userRoleAssignmentService.deleteAllRolesFromUserById(userId);

        // 404 Not Found Response
        if (okPacket.affectedRows === 0) {
            console.log(`[user-role-assignment.controller][deleteAllRolesFromUserById][Not Found] User not found with ID: ${userId}`);
            return res.status(404).json({ error: `User Role Assignment not found for User ID: ${userId}` });
        }

        // 204 OK - No Content response
        console.log(`[user-role-assignment.controller][deleteAllRolesFromUserById][Not Found] Successfully deleted role assignments for User ID: ${userId}`);
        return res.status(204).end();
    } catch (error) {
        console.error(`[user-role-assignment.controller][deleteAllRolesFromUserById][Error] ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteRoleFromUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id as string, 10);
        const roleId = parseInt(req.params.role_id as string, 10);
        if (Number.isNaN(userId) || Number.isNaN(roleId)) {
            // 400 Invalid response
            console.log(`[user-role-assignment.controller][deleteRoleFromUser][Error] Invalid UserRoleAssignment: { user_id: ${req.params.user_id as string}, role_id: ${req.params.role_id as string} }`);
            return res.status(400).json({ error: 'Invalid User ID or Role ID' });
        }

        const assignment: UserRoleAssignment = {
            user_id: userId,
            role_id: roleId
        }
        const okPacket = await userRoleAssignmentService.deleteRoleFromUser(assignment);

        if (okPacket.affectedRows === 0) {
            // 404 Not Found Response
            console.log(`[user-role-assignment.controller][deleteRoleFromUser][Not Found] User ${userId} not found with role ID: ${roleId}`);
            return res.status(404).json({ error: `User Role Assignment ${roleId} not found for User ID: ${userId}` });
        }

        // 204 OK - No Content Response
        console.log(`[user-role-assignment.controller][deleteRoleFromUser][Not Found] Successfully deleted role assignment ${roleId} for User ID: ${userId}`);
        return res.status(204).end();
    } catch (error) {
        console.error(`[user-role-assignment.controller][deleteRoleFromUser][Error] ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};