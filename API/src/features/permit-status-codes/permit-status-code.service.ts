/**
 * Author: Caleb Overmyer
 * Filename: permit-status-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import * as permitStatusCodeDAO from './permit-status-code.dao';
import { PermitStatusCode } from './permit-status-code.model';
import { AppError } from '../../common/errors/app.error';
import { HTTP_STATUS } from '../../common/errors/error-codes';

export const getPermitStatusCodes = async (connection?: PoolConnection): Promise<PermitStatusCode[]> => {
    const permitStatusCodes = await permitStatusCodeDAO.readPermitStatusCodes(connection);
    if (permitStatusCodes.length === 0) {
        throw new AppError("No permit status codes found", HTTP_STATUS.NOT_FOUND);
    }
    return permitStatusCodes;
};

export const getPermitStatusCode = async (status_code: string, connection?: PoolConnection): Promise<PermitStatusCode[]> => {
    const permitStatusCode = await permitStatusCodeDAO.readPermitStatusCodeById(status_code, connection);
    if (!permitStatusCode) {
        throw new AppError(`Permit status code ${status_code} not found`, HTTP_STATUS.NOT_FOUND);
    }
    return permitStatusCode;
};