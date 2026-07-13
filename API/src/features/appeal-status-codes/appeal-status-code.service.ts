/**
 * Author: Caleb Overmyer
 * Filename: appeal-status-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as appealStatusCodeDAO from './appeal-status-code.dao';

export const getAppealStatusCodes = async () => {
    return appealStatusCodeDAO.readAppealStatusCodes();
}

export const getAppealStatusCode = async (appeal_status_code: number) => {
    return appealStatusCodeDAO.readAppealStatusCodeById(appeal_status_code);
}