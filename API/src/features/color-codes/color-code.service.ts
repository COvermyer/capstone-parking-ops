import * as colorCodeDAO from './color-code.dao';

export const getColorCodes = async () => {
    return colorCodeDAO.readColorCodes();
}

export const getColorCode = async (color_id: number) => {
    return colorCodeDAO.readColorCodeById(color_id);
}

export const getColorCodeByName = async (color_name: string) => {
    return colorCodeDAO.readColorCodeByName(color_name);
}