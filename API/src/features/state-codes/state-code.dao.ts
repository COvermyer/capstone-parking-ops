/**
 * Author: Caleb Overmyer
 * Filename: state-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import { getExecutor, executeWithExecutor } from '../../services/mysql.connector';
import { StateCode } from './state-code.model';
import { stateCodeQueries } from './state-code.queries';


// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readStateCodes = async (connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<StateCode[]>(executor, stateCodeQueries.getAllStateCodes, []);
}

/**
 * 
 * @param state_id 
 * @returns 
 */
export const readStateCodeByStateId = async (state_id: number, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<StateCode[]>(executor, stateCodeQueries.getStateCodeByStateId, [state_id]);
}

/**
 * 
 * @param state_name 
 * @returns 
 */
export const readStateCodeByStateName = async (state_name: string, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<StateCode[]>(executor, stateCodeQueries.getStateCodeByStateName, [state_name]);
}

/**
 * 
 * @param state_abbreviation 
 * @returns 
 */
export const readStateCodeByStateAbbreviation = async (state_abbreviation: string, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<StateCode[]>(executor, stateCodeQueries.getStateCodeByStateAbbreviation, [state_abbreviation]);
}