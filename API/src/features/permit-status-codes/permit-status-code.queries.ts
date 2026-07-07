export const permitStatusCodeQueries = {
    getAllPermitStatusCodes: `SELECT * FROM permit_status_codes;`,
    getPermitStatusCodeById: `SELECT * FROM permit_status_codes WHERE status_code = ?;`,
}