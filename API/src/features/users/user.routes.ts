import { Router } from 'express';
import * as userController from './user.controller';
import { requireAuthentication } from '../../middleware/request-auth.middleware';
import { requiredRoles } from '../../middleware/authorization.middleware';

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

router.post(
    '/users',
    userController.createUser
);

router.put(
    '/users/:user_id',
    userController.updateUser
);

router.delete(
    '/user/:user_id',
    userController.deleteUser
);

export default router;