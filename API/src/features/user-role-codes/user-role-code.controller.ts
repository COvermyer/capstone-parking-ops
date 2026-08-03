/**
 * Author: Caleb Overmyer
 * Filename: user-role-code.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 * 
 * @deprecated user.controller.ts will handle any user based concerns exposed to the front end
 */
import { Request, RequestHandler, Response } from 'express';
import * as userRoleCodeService from './user-role-code.service';
import { asyncHandler } from '../../middleware/async-handler.middleware';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { AppError } from '../../common/errors/app.error';

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getUserRoleCodes: RequestHandler = asyncHandler(async (req, res) => {
    const userRoles = await userRoleCodeService.getUserRoles();
    return res.json(userRoles);
});

/**
 * Controller Method to format response body from Service data
 * @param req Request Body
 * @param res Response Body
 */
export const getUserRoleCodeById: RequestHandler = asyncHandler(async (req, res) => {
    const role_id = parseInt(req.params.role_id as string, 10);
    if (!role_id) {
        throw new AppError('Invalid role_id parameter', HTTP_STATUS.BAD_REQUEST);
    }

    const userRoles = await userRoleCodeService.getUserRole(role_id);
    return res.json(userRoles[0]); // Assuming the service returns an array, we send the first element
});
