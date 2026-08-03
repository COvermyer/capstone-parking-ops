/**
 * Author: Caleb Overmyer
 * Filename: appeal-status-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import { getExecutor, executeWithExecutor } from '../../services/mysql.connector';
import { AppealStatusCode } from './appeal-status-code.model';
import { appealStatusCodeQueries } from './appeal-status-code.queries';

// =============================
//              READ
// =============================
/**
 * Executes the given query
 * @returns 
 */
export const readAppealStatusCodes = async (connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<AppealStatusCode[]>(executor, appealStatusCodeQueries.getAppealStatusCodes, []);
}

/**
 * 
 * @param appeal_status_code 
 * @returns 
 */
export const readAppealStatusCodeById = async (appeal_status_code: number, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<AppealStatusCode[]>(executor, appealStatusCodeQueries.getAppealStatusCodeById, [appeal_status_code]);
}