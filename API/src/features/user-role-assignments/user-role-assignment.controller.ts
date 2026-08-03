/**
 * Author: Caleb Overmyer
 * Filename: user-role-assignment.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 * 
 * @deprecated should be handled from user.controller.ts
 */
import { RequestHandler } from 'express';
import * as userRoleAssignmentService from './user-role-assignment.service';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { AppError } from '../../common/errors/app.error';
import { asyncHandler } from '../../middleware/async-handler.middleware';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getAllUserRoleAssignments: RequestHandler = asyncHandler(async (req, res) => {
    const userRoleAssignments = await userRoleAssignmentService.getUserRoleAssignments();
    return res.json(userRoleAssignments);
});

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getUserRoleAssignmentsByUserId: RequestHandler = asyncHandler(async (req, res) => {
    const user_id = parseInt(req.params.user_id as string, 10);
    if (!user_id || isNaN(user_id)) {
        throw new AppError('Invalid user_id parameter', HTTP_STATUS.BAD_REQUEST);
    }

    const userRoleAssignments = await userRoleAssignmentService.getUserRoleAssignmentsByUserId(user_id);
    return res.json(userRoleAssignments);
});

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getUserRoleAssignmentsByRoleId: RequestHandler = asyncHandler(async (req, res) => {
    const role_id = parseInt(req.params.role_id as string, 10);
    if (!role_id || isNaN(role_id)) {
        throw new AppError('Invalid role_id parameter', HTTP_STATUS.BAD_REQUEST);
    }

    const userRoleAssignments = await userRoleAssignmentService.getUserRoleAssignmentsByRoleId(role_id);
    return res.json(userRoleAssignments);
});

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteAllRolesFromUserById: RequestHandler = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.user_id as string, 10);
    if (!userId || isNaN(userId)) {
        throw new AppError('Invalid user_id parameter', HTTP_STATUS.BAD_REQUEST);
    }

    const okPacket = await userRoleAssignmentService.deleteAllRolesFromUserById(userId);
    return res.json({
        success: true,
        message: `Deleted ${okPacket.affectedRows} role assignments for user with ID ${userId}`
    });
});

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteRoleFromUser: RequestHandler = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.user_id as string, 10);
    const roleId = parseInt(req.params.role_id as string, 10);
    if (!userId || isNaN(userId) || !roleId || isNaN(roleId)) {
        throw new AppError('Invalid user_id or role_id parameter', HTTP_STATUS.BAD_REQUEST);
    }

    const okPacket = await userRoleAssignmentService.deleteRoleFromUser({ user_id: userId, role_id: roleId });
    return res.json({
        success: true,
        message: `Deleted role assignment for user with ID ${userId} and role ID ${roleId}`
    });
});