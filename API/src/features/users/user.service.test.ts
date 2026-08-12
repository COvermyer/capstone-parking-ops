import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userDAO from './user.dao';
import * as userService from './user.service';

vi.mock('./user.dao');

describe('user.service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // test for createUser method
    describe('createUser', () => {
        it('should call userDAO.createUser without a connection', async () => {
            const request = {
                company_id: 63256,
                first_name: "string",
                last_name: "string",
                email: "string",
                phone_number: "string",

                username: "string",
                password: "string",
            }

            const expectedResult = {
                affectedRows: 1,
            }

            vi.mocked(userDAO.createUser).mockResolvedValue(
                expectedResult as any
            );
        });
    });
});