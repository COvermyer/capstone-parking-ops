/**
 * Author: Caleb Overmyer
 * Filename: permit-status-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as permitStatusCodeDAO from './permit-status-code.dao';

export const getPermitStatusCodes = async () => {
    return permitStatusCodeDAO.readPermitStatusCodes();
};

export const getPermitStatusCode = async (status_code: string) => {
    return permitStatusCodeDAO.readPermitStatusCodeById(status_code);
};