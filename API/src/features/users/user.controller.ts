/**
 * Author: Caleb Overmyer
 * Filename: user.controller.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { Request, RequestHandler, Response } from 'express';
import * as userService from './user.service';
import { User } from './user.model';
import { OkPacket } from 'mysql';
import { AuthenticatedRequest } from '../auth/authenticated-request';
import { asyncHandler } from '../../middleware/async-handler.middleware';
import { AppError } from '../../common/errors/app.error';
import { HTTP_STATUS } from '../../common/errors/error-codes';

/**
 * POST /users
 */
export const createUser: RequestHandler = asyncHandler(async (req, res) => {
    const okPacket = await userService.createUser(req.body);
    // console.log(`[user.controller][createUser][Success] User created successfully: ${okPacket.insertId}`);
    return res.status(201).json({ 
        success: true, 
        message: 'User created successfully', 
        user_id: okPacket.insertId 
    });
});

/**
 * GET /users
 * 
 * Supports:
 * ?page=&pageSize=
 * ?username=
 */
export const getUsers: RequestHandler = asyncHandler(async(req, res) => {
    // Uses query params to determine which service method should be utilized
    const { 
        page,
        pageSize,
        username,
        // companyId
    } = req.query;

    // getUsersPaginated
    if (page && pageSize) {
        let pageAsN = parseInt(page as string, 10);
        let pageSizeAsN = parseInt(pageSize as string, 10);
        const users: User[] = await userService.getUsersPaginated(pageAsN, pageSizeAsN);
        return res.json(users);
    }

    // getUserByUsername
    if (username) {
        const user: User = await userService.getUserByUsername(username as string);
        return res.json(user);
    }

    // getAllUsers
    const users: User[] = await userService.getAllUsers();
    return res.json(users);
});

/**
 * GET /users/me
 */
export const getCurrentUser: RequestHandler = asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.user_id;
    if (!userId) { // should be unreachable, but backup in case auth middleware fails.
        throw new AppError('User ID not found in request', HTTP_STATUS.UNAUTHORIZED);
    }

    const user = await userService.getUserById(userId);
    return res.json(user);
});

/**
 * GET /users/:user_id
 */
export const getUserById: RequestHandler = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.user_id as string, 10);
    const user: User = await userService.getUserById(userId);
    return res.json(user);
});

/**
 * PATCH /users/user_id 
 */
export const updateUser: RequestHandler = asyncHandler(async (req, res) => {
    let userId = parseInt(req.params.user_id as string, 10);
    if (Number.isNaN(userId)) {
        throw new AppError(`Invalid User ID: ${req.params.user_id as string}`, HTTP_STATUS.BAD_REQUEST);
    }

    const okPacket: OkPacket = await userService.updateUser(userId, req.body);
    return res.json(okPacket); // FIXME: Should maybe be a success message?
});

/**
 * DELETE /users/:user_id 
 */
export const deleteUser: RequestHandler = asyncHandler(async (req, res) => {
    let userId = parseInt(req.params.user_id as string, 10);
    if (Number.isNaN(userId)) {
        throw new AppError(`Invalid User ID: ${req.params.user_id as string}`, HTTP_STATUS.BAD_REQUEST);
    }

    const okPacket = await userService.deleteUser(userId);
    return res.json(okPacket); // FIXME: Should maybe be a success message?
});