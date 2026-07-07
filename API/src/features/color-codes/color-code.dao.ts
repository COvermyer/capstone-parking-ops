import { execute } from '../../services/mysql.connector';
import { ColorCode } from './color-code.model';
import { colorCodeQueries } from './color-code.queries';

export const readColorCodes = async () => {
    return execute<ColorCode[]>(colorCodeQueries.getColorCodes, []);
}

export const readColorCodeById = async (color_id: number) => {
    return execute<ColorCode[]>(colorCodeQueries.getColorCodeById, [color_id]);
}

export const readColorCodeByName = async (color_name: string) => {
    return execute<ColorCode[]>(colorCodeQueries.getColorCodeByName, [color_name.toUpperCase()]);
}