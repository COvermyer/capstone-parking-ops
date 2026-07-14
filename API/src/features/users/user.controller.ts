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

/**
 * Request Handler for GET /users endpoint - query params are checked, and routing logic is implemented
 * based on existing params to determine which service method is needed. 
 * @param req 
 * @param res 
 * @returns 
 */
export const getUsers = async (req: Request, res: Response) => {
    // Uses query params to determine which service method should be utilized
    const { 
        page,
        pageSize,
        username,
        // companyId
    } = req.query;


    // getUsersPaginated
    if (page && pageSize) {
        try {
            // const users: User[] = await userService.getUsersPaginated(page, pageSize);
        } catch (error) {
            console.error(`[user.controller][getUsers][getUsersPaginated][Error]: ${error}`);
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    // getUserByUsername
    if (username) {
        try {
            const user: User = await userService.getUserByUsername(username as string);
            if (!user) {
                console.log('[user.controller][getUserByUsername][Not Found] No user found with username: ', username);
                return res.status(404).json({ error: 'Username not found' });
            } else {
                console.log('[user.controller][getUserByUsername][Success] Fetched user:', user);
                return res.status(200).json(user);
            }
        } catch (error) {
            console.error(`[user.controller][getUsers][getUserByUsername][Error]: ${error}`);
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    // getAllUsers
    try {
        const users: User[] = await userService.getAllUsers();
        if (users.length === 0) {
            console.log('[user.controller][getUsers][getAllUsers][Not Found] No users found.');
            return res.status(404).json({ error: 'Users not found' });
        }
        console.log('[user.controller][getUsers][getAllUsers][Success] Fetched users:', users);
        return res.status(200).json(users);
    } catch (error) {
        console.error('[user.controller][getUsers][getAllUsers][Error] Error fetching users:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Request Handler for GET /users/user_id endpoint
 * @param req Request Body
 * @param res Response Body
 */
export const getUserById: RequestHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id as string, 10);
    try {
        const user: User = await userService.getUserById(userId);
        if (!user) {
            // Not found response
            console.log(`[user.controller][getUserById][Not Found] No user found with ID: ${userId}`);
            res.status(404).json({ error: 'User not found' });
        } else {
            // 200 OK response
            console.log(`[user.controller][getUserById][Success] Fetched user: ${user}`);
            res.status(200).json(user);
        }
    } catch (error) {
        // 500 Server Error response
        console.error(`[user.controller][getUserById][Error] Error fetching user: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Request Handler for POST /users endpoint
 * @param req Request Body
 * @param res Response Body
 */
export const createUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        // 201 resource created response
        const okPacket = await userService.createUser(req.body);
        console.log(`[user.controller][createUser][Success] User created successfully: ${okPacket.insertId}`);
        res.status(201).json({ message: 'User created successfully', user_id: okPacket.insertId });
    } catch (error) {
        // 500 Server Error response
        console.error(`[user.controller][createUser][Error] Error creating user: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Request Handler for PUT /users/user_id endpoint
 * @param req 
 * @param res 
 * @returns 
 */
export const updateUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        let userId = parseInt(req.params.user_id as string, 10);
        if (Number.isNaN(userId)) {
            // 400 Invalid response
            console.log(`[user.controller][updateUser][Error] Invalid User ID: ${req.params.user_id as string}`);
            return res.status(400).json({ error: 'Invalid User ID' });
        }

        // 200 OK response
        const okPacket: OkPacket = await userService.updateUser(userId, req.body);
        console.log(`[user.controller][updateUser][Success] Updated User ID: ${userId}`);
        return res.status(200).json({ message: 'User created successfully', user_id: userId })
    } catch (error) {
        // 500 Server Error response
        console.error(`[user.controller][updateUser][error] Failed to update user: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {};