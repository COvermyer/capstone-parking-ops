/**
 * Author: Caleb Overmyer
 * Filename: citation-status-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const citationStatusCodeQueries = {
    // Create
    createCitationStatusCode: `INSERT INTO citation_status_codes (status_message) VALUES (?);`,

    // Read
    getCitationStatusCodes: `SELECT * FROM citation_status_codes;`,
    getCitationStatusCodeById: `SELECT * FROM citation_status_codes WHERE status_code = ?;`,

    // Update
    // simple field, no query builder
    updateCitationStatusCode: `UPDATE citation_status_codes SET status_message = ? WHERE status_code = ?;`,

    // Delete
    deleteCitationStatusCode: `DELETE FROM citation_status_codes WHERE status_code = ?`,
};