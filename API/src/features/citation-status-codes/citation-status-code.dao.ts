/**
 * Author: Caleb Overmyer
 * Filename: citation-status-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import { getExecutor, executeWithExecutor } from '../../services/mysql.connector';
import { CitationStatusCode } from './citation-status-code.model';
import { citationStatusCodeQueries } from './citation-status-code.queries';


// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readCitationStatusCodes = async (connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<CitationStatusCode[]>(executor, citationStatusCodeQueries.getCitationStatusCodes, []);
};

/**
 * 
 * @param status_code 
 * @returns 
 */
export const readCitationStatusCodesById = async (status_code: number, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<CitationStatusCode[]>(executor, citationStatusCodeQueries.getCitationStatusCodeById, [status_code]);
}