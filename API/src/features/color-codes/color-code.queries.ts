export const colorCodeQueries = {
    getColorCodes: `SELECT * FROM color_codes;`,
    getColorCodeById: `SELECT * FROM color_codes WHERE color_id = ?;`,
    getColorCodeByName: `SELECT * FROM color_codes WHERE color_name = ?;`,
}