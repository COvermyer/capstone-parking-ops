import * as citationOffenseCodeDAO from './citation-offense-code.dao';

export const getCitationOffenseCodes = async () => {
    return citationOffenseCodeDAO.readCitationOffenseCodes();
}

export const getCitationOffenseCodeById = async (offence_code_id: number) => {
    return citationOffenseCodeDAO.readCitationOffenseCodeById(offence_code_id);
}