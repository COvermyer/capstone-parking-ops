/**
 * Author: Caleb Overmyer
 * Filename: color-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute } from '../../services/mysql.connector';
import { ColorCode } from './color-code.model';
import { colorCodeQueries } from './color-code.queries';


// =============================
//              READ
// =============================
/**
 * 
 * @returns 
 */
export const readColorCodes = async () => {
    return execute<ColorCode[]>(colorCodeQueries.getColorCodes, []);
}

/**
 * 
 * @param color_id 
 * @returns 
 */
export const readColorCodeById = async (color_id: number) => {
    return execute<ColorCode[]>(colorCodeQueries.getColorCodeById, [color_id]);
}

/**
 * 
 * @param color_name 
 * @returns 
 */
export const readColorCodeByName = async (color_name: string) => {
    return execute<ColorCode[]>(colorCodeQueries.getColorCodeByName, [color_name.toUpperCase()]);
}