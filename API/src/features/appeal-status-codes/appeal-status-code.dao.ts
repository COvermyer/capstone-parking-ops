/**
 * Author: Caleb Overmyer
 * Filename: appeal-status-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute } from '../../services/mysql.connector';
import { AppealStatusCode } from './appeal-status-code.model';
import { appealStatusCodeQueries } from './appeal-status-code.queries';

// =============================
//              READ
// =============================
/**
 * Executes the given query
 * @returns 
 */
export const readAppealStatusCodes = async () => {
    return execute<AppealStatusCode[]>(appealStatusCodeQueries.getAppealStatusCodes, []);
}

/**
 * 
 * @param appeal_status_code 
 * @returns 
 */
export const readAppealStatusCodeById = async (appeal_status_code: number) => {
    return execute<AppealStatusCode[]>(appealStatusCodeQueries.getAppealStatusCodeById, [appeal_status_code]);
}