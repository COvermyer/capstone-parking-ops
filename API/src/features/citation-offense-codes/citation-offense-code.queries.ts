export const citationOffenseCodeQueries = {
    getAllCitationOffenseCodes: `SELECT * FROM citation_offence_codes;`,
    getCitationOffenseCodeById: `SELECT * FROM citation_offence_codes WHERE offence_code_id = ?;`
}