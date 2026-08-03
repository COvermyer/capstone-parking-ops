/**
 * Author: Caleb Overmyer
 * Filename: permit-status-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import { getExecutor, executeWithExecutor } from '../../services/mysql.connector';
import { PermitStatusCode } from './permit-status-code.model';
import { permitStatusCodeQueries } from './permit-status-code.queries';


// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readPermitStatusCodes = async (connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<PermitStatusCode[]>(executor, permitStatusCodeQueries.getAllPermitStatusCodes, []);
}

/**
 * 
 * @param status_code 
 * @returns 
 */
export const readPermitStatusCodeById = async (status_code: string, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<PermitStatusCode[]>(executor, permitStatusCodeQueries.getPermitStatusCodeById, [status_code]);
}