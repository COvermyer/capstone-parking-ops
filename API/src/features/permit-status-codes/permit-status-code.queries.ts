/**
 * Author: Caleb Overmyer
 * Filename: permit-status-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const permitStatusCodeQueries = {
    getAllPermitStatusCodes: `SELECT * FROM permit_status_codes;`,
    getPermitStatusCodeById: `SELECT * FROM permit_status_codes WHERE status_code = ?;`,
}