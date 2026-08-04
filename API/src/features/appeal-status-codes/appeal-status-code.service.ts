/**
 * Author: Caleb Overmyer
 * Filename: appeal-status-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import * as appealStatusCodeDAO from './appeal-status-code.dao';
import { AppealStatusCode } from './appeal-status-code.model';
import { AppError } from '../../common/errors/app.error';
import { HTTP_STATUS } from '../../common/errors/error-codes';

export const getAppealStatusCodes = async (connection?: PoolConnection): Promise<AppealStatusCode[]> => {
    const appealStatusCodes = await appealStatusCodeDAO.readAppealStatusCodes(connection);
    if (appealStatusCodes.length === 0) {
        throw new AppError(`Status Code not found`, HTTP_STATUS.NOT_FOUND);
    }
    return appealStatusCodes;
}

export const getAppealStatusCode = async (appeal_status_code: number, connection?: PoolConnection): Promise<AppealStatusCode[]> => {
    const appealStatusCodes = await appealStatusCodeDAO.readAppealStatusCodeById(appeal_status_code);
    if (appealStatusCodes.length === 0) {
        throw new AppError(`Status Code not found`, HTTP_STATUS.NOT_FOUND);
    }
    return appealStatusCodes;
}