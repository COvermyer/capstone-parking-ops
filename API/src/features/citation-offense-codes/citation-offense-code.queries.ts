import { UpdateQuery } from "../../types/update-query.model"
import { UpdateCitationOffenseCodeRequest } from "./citation-offense-code.model";

/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const citationOffenseCodeQueries = {
    // Create
    createCitationOffenseCode: `INSERT INTO citation_offense_codes (offense_code, offense_name, charge, appealable) VALUES (?, ?, ?, ?);`,

    // Read
    getAllCitationOffenseCodes: `SELECT * FROM citation_offense_codes;`,
    getCitationOffenseCodeById: `SELECT * FROM citation_offense_codes WHERE offense_code_id = ?;`,

    // Update
    // Use query builder

    // Delete
    deleteCitationOffenseCode: `DELETE FROM citation_offense_codes WHERE offense_code_id = ?`,
}

export const buildUpdateCitationOffenseCodeQuery = (
    request: UpdateCitationOffenseCodeRequest
): UpdateQuery => {
    const setClauses: string[] = [];
    const values: unknown[] = [];

    if (request.offense_code !== undefined) {
        setClauses.push('offense_code = ?');
        values.push(request.offense_code);
    }

    if (request.offense_name !== undefined) {
        setClauses.push('offense_name = ?');
        values.push(request.offense_name);
    }

    if (request.charge !== undefined) {
        setClauses.push('charge = ?');
        values.push(request.charge);
    }

    if (request.appealable !== undefined) {
        setClauses.push('appealable = ?');
        values.push(request.appealable);
    }

    // WHERE clause
    values.push(request.offense_code_id);

    if (setClauses.length === 0) throw new Error('Invalid update query');
    return ({
        sql: `
            UPDATE citation_offense_codes
            SET ${setClauses.join(", ")}
            WHERE citation_offense_id = ?
        `,
        values
    });
};