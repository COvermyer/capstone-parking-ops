import { Router } from 'express';
import * as userController from './user.controller';
import { requireAuthentication } from '../../middleware/request-auth.middleware';
import { requiredRoles } from '../../middleware/authorization.middleware';
import * as notImplemented from '../../types/not-implemented.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();

// CREATE - User
router.post(
    '/users',
    userController.createUser
);

// READ - User
router.get(
    '/users',
    // requireAuthentication,
    // requiredRoles("ADMIN", "SYSADMIN"),
    userController.getUsers
);

// READ - current user
router.get(
    '/users/me',
    requireAuthentication,
    userController.getCurrentUser
);

// READ - Given user by ID
router.get(
    '/users/:user_id',
    userController.getUserById
);

// UPDATE Current user-credentials
router.patch(
    '/users/me/credentials',
    requireAuthentication,
    notImplemented.notImplemented
);

// UPDATE - Given user-credentials by user ID
router.patch(
    '/users/:user_id/credentials',
    requireAuthentication,
    requiredRoles("ADMIN"),
    notImplemented.notImplemented
);

// UPDATE - User
router.patch(
    '/users/:user_id',
    userController.updateUser
);

// DELETE - User
router.delete(
    '/users/:user_id',
    userController.deleteUser
);

export default router;