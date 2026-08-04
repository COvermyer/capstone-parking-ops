/**
 * Author: Caleb Overmyer
 * Filename: citation-status-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { AppError } from '../../common/errors/app.error';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import * as citationStatusCodeDAO from './citation-status-code.dao';
import { CitationStatusCode } from './citation-status-code.model';

export const getCitationStatusCodes = async (connection?: any): Promise<CitationStatusCode[]> => {
    const citationStatusCodes = await citationStatusCodeDAO.readCitationStatusCodes(connection);
    if (citationStatusCodes.length === 0) {
        throw new AppError("No citation status codes found", HTTP_STATUS.NOT_FOUND);
    }
    return citationStatusCodes;
};

export const getCitationStatusCodeById = async (status_code: number, connection?: any): Promise<CitationStatusCode[]> => {
    const citationStatusCode = await citationStatusCodeDAO.readCitationStatusCodesById(status_code, connection);
    if (!citationStatusCode) {
        throw new AppError("Citation status code not found", HTTP_STATUS.NOT_FOUND);
    }
    return citationStatusCode;
};