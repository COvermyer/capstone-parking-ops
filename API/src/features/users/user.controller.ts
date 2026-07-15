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
            let pageAsN = parseInt(page as string, 10);
            let pageSizeAsN = parseInt(pageSize as string, 10);

            const users: User[] = await userService.getUsersPaginated(pageAsN, pageSizeAsN);
            if (users.length === 0) {
                // 404 Not Found response
                console.log(`[user.controller][getUsers][getUsersPaginated][Not Found] No users found`);
                return res.status(404).json({ error: 'Users not found' });
            }

            // 200 OK response
            console.log(`[user.controller][getUsers][getUsersPaginated][Success] Fetched users:`, users);
            return res.status(200).json(users)
        } catch (error) {
            // 500 Server Error
            console.error(`[user.controller][getUsers][getUsersPaginated][Error] Error fetching users: ${error}`);
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    // getUserByUsername
    if (username) {
        try {
            const user: User = await userService.getUserByUsername(username as string);
            if (!user) {
                // 404 Not Found response
                console.log(`[user.controller][getUserByUsername][Not Found] No user found with username: ${username}`);
                return res.status(404).json({ error: 'Username not found' });
            } else {
                // 200 OK response
                console.log(`[user.controller][getUserByUsername][Success] Fetched user: `, user);
                return res.status(200).json(user);
            }
        } catch (error) {
            // 500 Server Error
            console.error(`[user.controller][getUsers][getUserByUsername][Error] Error fetching users: ${error}`);
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    // getAllUsers
    try {
        const users: User[] = await userService.getAllUsers();
        if (users.length === 0) {
            // 404 Not Found response
            console.log('[user.controller][getUsers][getAllUsers][Not Found] No users found.');
            return res.status(404).json({ error: 'Users not found' });
        }

        // 200 OK response
        console.log(`[user.controller][getUsers][getAllUsers][Success] Fetched users: `, users);
        return res.status(200).json(users);
    } catch (error) {
        // 500 Server Error
        console.error(`[user.controller][getUsers][getAllUsers][Error] Error fetching users: ${error}`);
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
            // 404 Not found response
            console.log(`[user.controller][getUserById][Not Found] No user found with ID: ${userId}`);
            return res.status(404).json({ error: 'User not found' });
        } else {
            // 200 OK response
            console.log(`[user.controller][getUserById][Success] Fetched user: `, user);
            return res.status(200).json(user);
        }
    } catch (error) {
        // 500 Server Error response
        console.error(`[user.controller][getUserById][Error] Error fetching user: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Request Handler for POST /users endpoint
 * @param req Request Body
 * @param res Response Body
 */
export const createUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        // 201 Created response
        const okPacket = await userService.createUser(req.body);
        console.log(`[user.controller][createUser][Success] User created successfully: ${okPacket.insertId}`);
        return res.status(201).json({ message: 'User created successfully', user_id: okPacket.insertId });
    } catch (error) {
        // 500 Server Error response
        console.error(`[user.controller][createUser][Error] Error creating user: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
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
        return res.status(200).json({ message: 'User updated successfully', user_id: userId })
    } catch (error) {
        // 500 Server Error response
        console.error(`[user.controller][updateUser][Error] Failed to update user: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Request Handler for DELETE /users/user_id
 * @param req 
 * @param res 
 */
export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        let userId = parseInt(req.params.user_id as string, 10);
        if (Number.isNaN(userId)) {
            // 400 Invalid response
            console.log(`[user.controller][deleteUser][Error] Invalid User ID: ${req.params.user_id as string}`);
            return res.status(400).json({ error: 'Invalid User ID' });
        }

        const okPacket = await userService.deleteUser(userId); // execute the service method

        // 404 Not Found response
        if (okPacket.affectedRows === 0) {
            console.log(`[user.controller][deleteUser][Not Found] User not found with ID: ${userId}`);
            return res.status(404).json({ error: 'User not found' });
        }

        // 204 OK - No Content response
        console.log(`[user.controller][deleteUser][Success] Deleted user with ID: ${userId}`);
        return res.status(204).end();
    } catch (error) {
        // 500 Server Error
        console.error(`[user.controller][deleteUser][Error] Failed to delete user: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};