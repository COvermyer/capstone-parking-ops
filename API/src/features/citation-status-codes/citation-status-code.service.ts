import * as citationStatusCodeDAO from './citation-status-code.dao';

export const getCitationStatusCodes = async () => {
    return citationStatusCodeDAO.readCitationStatusCodes();
};

export const getCitationStatusCodeById = async (status_code: number) => {
    return citationStatusCodeDAO.readCitationStatusCodesById(status_code);
};