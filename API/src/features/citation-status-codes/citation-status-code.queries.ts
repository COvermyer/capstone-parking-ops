/**
 * Author: Caleb Overmyer
 * Filename: citation-status-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const citationStatusCodeQueries = {
    // Create

    // Read
    getCitationStatusCodes: `SELECT * FROM citation_status_codes;`,
    getCitationStatusCodeById: `SELECT * FROM citation_status_codes WHERE status_code = ?;`

    // Update

    // Delete
};