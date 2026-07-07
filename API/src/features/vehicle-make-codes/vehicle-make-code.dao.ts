import { execute } from "../../services/mysql.connector";
import { VehicleMakeCode } from "./vehicle-make-code.model";
import { vehicleMakeCodeQueries } from "./vehicle-make-code.queries";

export const readVehicleMakeCodes = async () => {
    return execute<VehicleMakeCode[]>(vehicleMakeCodeQueries.getAllVehicleMakeCodes, []);
}

export const readVehicleMakeCodeById = async (make_id: number) => {
    return execute<VehicleMakeCode[]>(vehicleMakeCodeQueries.getVehicleMakeCodeById, [make_id]);
}

export const readVehicleMakeCodeByName = async (make_name: string) => {
    return execute<VehicleMakeCode[]>(vehicleMakeCodeQueries.getVehicleMakeCodeByName, [make_name.toUpperCase()]);
}