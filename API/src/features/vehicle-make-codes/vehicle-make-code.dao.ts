/**
 * Author: Caleb Overmyer
 * Filename: vehicle-make-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute } from "../../services/mysql.connector";
import { VehicleMakeCode } from "./vehicle-make-code.model";
import { vehicleMakeCodeQueries } from "./vehicle-make-code.queries";

/**
 * Get all VehicleMakeCodes DAO method
 * @returns a Promise of a VehicleMakeCode array
 */
export const readVehicleMakeCodes = async () => {
    return execute<VehicleMakeCode[]>(vehicleMakeCodeQueries.getAllVehicleMakeCodes, []);
}

/**
 * Get by make_id VehicleMakeCodes DAO method
 * @param make_id the make_id of the requested VehicleMakeCode
 * @returns a Promise of a VehicleMakeCode array
 */
export const readVehicleMakeCodeById = async (make_id: number) => {
    return execute<VehicleMakeCode[]>(vehicleMakeCodeQueries.getVehicleMakeCodeById, [make_id]);
}

/**
 * Get by make_name VehicleMakeCodes DAO method
 * @param make_name the make_id of the requested VehicleMakeCode
 * @returns a Promise of a VehicleMakeCode array
 */
export const readVehicleMakeCodeByName = async (make_name: string) => {
    return execute<VehicleMakeCode[]>(vehicleMakeCodeQueries.getVehicleMakeCodeByName, [make_name.toUpperCase()]);
}