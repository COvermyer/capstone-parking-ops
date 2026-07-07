import { Request, RequestHandler, Response } from 'express';
import * as userService from './user.service';
import { User } from './user.model';

export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const users: User[] = await userService.getAllUsers();
        console.log('[user.controller][getAllUsers][Success] Fetched users:', users);
        res.status(200).json(users);
    } catch (error) {
        console.error('[user.controller][getAllUsers][Error] Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getUserById: RequestHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id as string, 10);
    try {
        const user: User[] = await userService.getUserById(userId);
        if (user.length === 0) {
            console.log('[user.controller][getUserById][Not Found] No user found with ID:', userId);
            res.status(404).json({ error: 'User not found' });
        } else {
            console.log('[user.controller][getUserById][Success] Fetched user:', user[0]);
            res.status(200).json(user[0]);
        }
    } catch (error) {
        console.error('[user.controller][getUserById][Error] Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}