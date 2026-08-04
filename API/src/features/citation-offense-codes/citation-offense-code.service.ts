/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import * as citationOffenseCodeDAO from './citation-offense-code.dao';
import { CitationOffenseCode } from './citation-offense-code.model';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { AppError } from '../../common/errors/app.error';

export const getCitationOffenseCodes = async (connection?: PoolConnection): Promise<CitationOffenseCode[]> => {
    const citationOffenseCodes = await citationOffenseCodeDAO.readCitationOffenseCodes(connection);
    if (citationOffenseCodes.length === 0) {
        throw new AppError("No citation offense codes found", HTTP_STATUS.NOT_FOUND);
    }
    return citationOffenseCodes;
}

export const getCitationOffenseCodeById = async (offense_code_id: number, connection?: PoolConnection): Promise<CitationOffenseCode[]> => {
    const citationOffenseCode = await citationOffenseCodeDAO.readCitationOffenseCodeById(offense_code_id, connection);
    if (!citationOffenseCode) {
        throw new AppError(`Citation offense code with ID ${offense_code_id} not found`, HTTP_STATUS.NOT_FOUND);
    }
    return citationOffenseCode;
}