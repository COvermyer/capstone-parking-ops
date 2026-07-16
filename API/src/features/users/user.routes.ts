import { Router } from 'express';
import * as userController from './user.controller';
import { requireAuthentication } from '../../middleware/request-auth.middleware';
import { requiredRoles } from '../../middleware/authorization.middleware';
import * as notImplemented from '../../types/not-implemented.controller';

/**
 * Defines a router and assigns the HTTP methods associated with the data concern
 */
const router = Router();
router.get(
    '/users',
    // requireAuthentication,
    // requiredRoles("ADMIN", "SYSADMIN"),
    userController.getUsers
);

router.get(
    '/users/:user_id',
    userController.getUserById
);

router.get(
    '/users/me',
    requireAuthentication,
    notImplemented.notImplemented
);

router.post(
    '/users',
    userController.createUser
);

router.patch(
    '/users/:user_id',
    userController.updateUser
);

router.delete(
    '/users/:user_id',
    userController.deleteUser
);

// user credentials
router.patch(
    '/users/me/credentials',
    requireAuthentication,
    notImplemented.notImplemented
);

export default router;