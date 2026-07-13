/**
 * Author: Caleb Overmyer
 * Filename: vehicle-make-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */

import * as vehicleMakeCodeDAO from './vehicle-make-code.dao';

/**
 * Get all method for Vehicle Make Codes
 * @returns a Promise for a VehicleMakeCode array
 */
export const getVehicleMakeCodes = async () => {
    return vehicleMakeCodeDAO.readVehicleMakeCodes();
}

/**
 * Get by Id method for Vehicle Make Codes
 * @param make_id The ID to search by
 * @returns a Promise for a VehicleMakeCode array
 */
export const getVehicleMakeCodeById = async (make_id: number) => {
    return vehicleMakeCodeDAO.readVehicleMakeCodeById(make_id);
}

/**
 * Get by name method for Vehicle make codes
 * @param make_name The name of the make for the vehicle (e.g. "Ford")
 * @returns a Promise for a VehicleMakeCode array
 */
export const getVehicleMakeCodeByName = async (make_name: string) => {
    return vehicleMakeCodeDAO.readVehicleMakeCodeByName(make_name);
}