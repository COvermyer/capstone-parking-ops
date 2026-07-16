/**
 * Author: Caleb Overmyer
 * Filename: permit-status-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute } from '../../services/mysql.connector';
import { PermitStatusCode } from './permit-status-code.model';
import { permitStatusCodeQueries } from './permit-status-code.queries';


// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readPermitStatusCodes = async () => {
    return execute<PermitStatusCode[]>(permitStatusCodeQueries.getAllPermitStatusCodes, []);
}

/**
 * 
 * @param status_code 
 * @returns 
 */
export const readPermitStatusCodeById = async (status_code: string) => {
    return execute<PermitStatusCode[]>(permitStatusCodeQueries.getPermitStatusCodeById, [status_code]);
}