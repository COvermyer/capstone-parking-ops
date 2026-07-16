/**
 * Author: Caleb Overmyer
 * Filename: citation-status-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute } from '../../services/mysql.connector';
import { CitationStatusCode } from './citation-status-code.model';
import { citationStatusCodeQueries } from './citation-status-code.queries';


// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readCitationStatusCodes = async () => {
    return execute<CitationStatusCode[]>(citationStatusCodeQueries.getCitationStatusCodes, []);
};

/**
 * 
 * @param status_code 
 * @returns 
 */
export const readCitationStatusCodesById = async (status_code: number) => {
    return execute<CitationStatusCode[]>(citationStatusCodeQueries.getCitationStatusCodeById, [status_code]);
}