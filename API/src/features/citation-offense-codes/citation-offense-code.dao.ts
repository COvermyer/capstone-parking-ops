/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute } from "../../services/mysql.connector";
import { CitationOffenseCode } from "./citation-offense-code.model";
import { citationOffenseCodeQueries } from "./citation-offense-code.queries";

export const readCitationOffenseCodes = async () => {
    return execute<CitationOffenseCode[]>(citationOffenseCodeQueries.getAllCitationOffenseCodes, []);
}

export const readCitationOffenseCodeById = async (offence_code_id: number) => {
    return execute<CitationOffenseCode[]>(citationOffenseCodeQueries.getCitationOffenseCodeById, [offence_code_id]);
}