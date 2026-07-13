/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import * as citationOffenseCodeDAO from './citation-offense-code.dao';

export const getCitationOffenseCodes = async () => {
    return citationOffenseCodeDAO.readCitationOffenseCodes();
}

export const getCitationOffenseCodeById = async (offence_code_id: number) => {
    return citationOffenseCodeDAO.readCitationOffenseCodeById(offence_code_id);
}