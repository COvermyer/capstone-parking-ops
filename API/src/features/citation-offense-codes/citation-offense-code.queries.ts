/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const citationOffenseCodeQueries = {
    // Create

    // Read
    getAllCitationOffenseCodes: `SELECT * FROM citation_offense_codes;`,
    getCitationOffenseCodeById: `SELECT * FROM citation_offense_codes WHERE offense_code_id = ?;`

    // Update

    // Delete
}