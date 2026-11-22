/**
 * Author: Caleb Overmyer
 * Filename: appeal-status-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const appealStatusCodeQueries = {
    // Create
    createAppealStatusCode: `INSERT INTO appeal_status_codes (status_message) VALUES (?)`,

    // Read
    getAppealStatusCodes: `SELECT * FROM appeal_status_codes;`,
    getAppealStatusCodeById: `SELECT * FROM appeal_status_codes WHERE appeal_status_code = ?;`,

    // Update
    // Simple update, no query builder needed
    updateAppealStatusCode: `UPDATE appeal_status_codes SET status_message = ? WHERE appeal_status_code = ?`,

    // Delete
    deleteAppealStatusCode: `DELETE FROM appeal_status_codes WHERE appeal_status_code = ?`,
}