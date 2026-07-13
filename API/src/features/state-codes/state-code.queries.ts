/**
 * Author: Caleb Overmyer
 * Filename: state-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const stateCodeQueries = {
    getAllStateCodes: `SELECT * FROM state_codes;`,
    getStateCodeByStateId: `SELECT * FROM state_codes WHERE state_id = ?;`,
    getStateCodeByStateName: `SELECT * FROM state_codes WHERE state_name = ?;`,
    getStateCodeByStateAbbreviation: `SELECT * FROM state_codes WHERE state_abbreviation = ?;`,
}