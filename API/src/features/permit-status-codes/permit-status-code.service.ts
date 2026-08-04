/**
 * Author: Caleb Overmyer
 * Filename: permit-status-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import * as permitStatusCodeDAO from './permit-status-code.dao';
import { PermitStatusCode } from './permit-status-code.model';

export const getPermitStatusCodes = async (connection?: PoolConnection): Promise<PermitStatusCode[]> => {
    const permitStatusCodes = await permitStatusCodeDAO.readPermitStatusCodes(connection);
    if (permitStatusCodes.length === 0) {
        throw new Error("No permit status codes found");
    }
    return permitStatusCodes;
};

export const getPermitStatusCode = async (status_code: string, connection?: PoolConnection): Promise<PermitStatusCode[]> => {
    const permitStatusCode = await permitStatusCodeDAO.readPermitStatusCodeById(status_code, connection);
    if (!permitStatusCode) {
        throw new Error(`Permit status code ${status_code} not found`);
    }
    return permitStatusCode;
};