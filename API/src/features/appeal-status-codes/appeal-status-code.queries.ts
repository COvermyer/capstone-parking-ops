export const appealStatusCodeQueries = {
    getAppealStatusCodes: `SELECT * FROM appeal_status_codes;`,
    getAppealStatusCodeById: `SELECT * FROM appeal_status_codes WHERE appeal_status_code = ?;`,
}