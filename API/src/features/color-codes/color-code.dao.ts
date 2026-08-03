/**
 * Author: Caleb Overmyer
 * Filename: color-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import { getExecutor, executeWithExecutor } from '../../services/mysql.connector';
import { ColorCode } from './color-code.model';
import { colorCodeQueries } from './color-code.queries';


// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readColorCodes = async (connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<ColorCode[]>(executor, colorCodeQueries.getColorCodes, []);
}

/**
 * 
 * @param color_id 
 * @returns 
 */
export const readColorCodeById = async (color_id: number, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<ColorCode[]>(executor, colorCodeQueries.getColorCodeById, [color_id]);
}

/**
 * @param color_name 
 * @returns 
 */
export const readColorCodeByName = async (color_name: string, connection?: PoolConnection) => {
    const executor = getExecutor(connection);
    return executeWithExecutor<ColorCode[]>(executor, colorCodeQueries.getColorCodeByName, [color_name.toUpperCase()]);
}