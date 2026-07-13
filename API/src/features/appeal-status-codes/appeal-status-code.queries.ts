/**
 * Author: Caleb Overmyer
 * Filename: appeal-status-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const appealStatusCodeQueries = {
    getAppealStatusCodes: `SELECT * FROM appeal_status_codes;`,
    getAppealStatusCodeById: `SELECT * FROM appeal_status_codes WHERE appeal_status_code = ?;`,
}