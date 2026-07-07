export const stateCodeQueries = {
    getAllStateCodes: `SELECT * FROM state_codes;`,
    getStateCodeByStateId: `SELECT * FROM state_codes WHERE state_id = ?;`,
    getStateCodeByStateName: `SELECT * FROM state_codes WHERE state_name = ?;`,
    getStateCodeByStateAbbreviation: `SELECT * FROM state_codes WHERE state_abbreviation = ?;`,
}