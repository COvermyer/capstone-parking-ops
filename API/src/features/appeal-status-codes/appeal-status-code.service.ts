import * as appealStatusCodeDAO from './appeal-status-code.dao';

export const getAppealStatusCodes = async () => {
    return appealStatusCodeDAO.readAppealStatusCodes();
}

export const getAppealStatusCode = async (appeal_status_code: number) => {
    return appealStatusCodeDAO.readAppealStatusCodeById(appeal_status_code);
}