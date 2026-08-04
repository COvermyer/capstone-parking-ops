/**
 * Author: Caleb Overmyer
 * Filename: color-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import * as colorCodeDAO from './color-code.dao';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { AppError } from '../../common/errors/app.error';
import { ColorCode } from './color-code.model';

export const getColorCodes = async (connection?: PoolConnection): Promise<ColorCode[]> => {
    const colorCodes = await colorCodeDAO.readColorCodes(connection);
    if (colorCodes.length === 0) {
        throw new AppError("No color codes found", HTTP_STATUS.NOT_FOUND);
    }
    return colorCodes;
}

export const getColorCode = async (color_id: number, connection?: PoolConnection): Promise<ColorCode[]> => {
    const colorCode = await colorCodeDAO.readColorCodeById(color_id, connection);
    if (!colorCode) {
        throw new AppError("Color code not found", HTTP_STATUS.NOT_FOUND);
    }
    return colorCode;
}

export const getColorCodeByName = async (color_name: string, connection?: PoolConnection): Promise<ColorCode[]> => {
    const colorCode = await colorCodeDAO.readColorCodeByName(color_name, connection);
    if (!colorCode) {
        throw new AppError("Color code not found", HTTP_STATUS.NOT_FOUND);
    }
    return colorCode;
}