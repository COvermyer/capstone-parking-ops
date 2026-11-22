/**
 * Author: Caleb Overmyer
 * Filename: state-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const stateCodeQueries = {
    // Create
    createStateCode: ``,

    // Read
    getAllStateCodes: `SELECT * FROM state_codes;`,
    getStateCodeByStateId: `SELECT * FROM state_codes WHERE state_id = ?;`,
    getStateCodeByStateName: `SELECT * FROM state_codes WHERE state_name = ?;`,
    getStateCodeByStateAbbreviation: `SELECT * FROM state_codes WHERE state_abbreviation = ?;`,
    
    // Update
    // No need for query builder since we can reliably expect all values
    updateStateCode: `UPDATE state_codes SET state_code = ?, state_abbreviation= ? WHERE state_id = ?`,

    // Delete
    deleteStateCodeByStateId: `DELETE FROM state_codes WHERE state_id = ?`,
}