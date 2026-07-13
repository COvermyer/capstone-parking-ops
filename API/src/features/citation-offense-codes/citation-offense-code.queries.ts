/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const citationOffenseCodeQueries = {
    getAllCitationOffenseCodes: `SELECT * FROM citation_offence_codes;`,
    getCitationOffenseCodeById: `SELECT * FROM citation_offence_codes WHERE offence_code_id = ?;`
}