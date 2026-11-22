/**
 * Author: Caleb Overmyer
 * Filename: color-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const colorCodeQueries = {
    // Create

    // Read
    getColorCodes: `SELECT * FROM color_codes;`,
    getColorCodeById: `SELECT * FROM color_codes WHERE color_id = ?;`,
    getColorCodeByName: `SELECT * FROM color_codes WHERE color_name = ?;`,

    // Update

    // Delete
}