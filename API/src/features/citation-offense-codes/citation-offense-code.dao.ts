/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import { getExecutor, executeWithExecutor } from '../../services/mysql.connector';
import { CitationOffenseCode } from "./citation-offense-code.model";
import { citationOffenseCodeQueries } from "./citation-offense-code.queries";


// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readCitationOffenseCodes = async (connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<CitationOffenseCode[]>(executor, citationOffenseCodeQueries.getAllCitationOffenseCodes, []);
}

/**
 * 
 * @param offense_code_id 
 * @returns 
 */
export const readCitationOffenseCodeById = async (offense_code_id: number, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<CitationOffenseCode[]>(executor, citationOffenseCodeQueries.getCitationOffenseCodeById, [offense_code_id]);
}