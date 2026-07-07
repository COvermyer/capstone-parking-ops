export const citationStatusCodeQueries = {
    getCitationStatusCodes: `SELECT * FROM citation_status_codes;`,
    getCitationStatusCodeById: `SELECT * FROM citation_status_codes WHERE status_code = ?;`
};