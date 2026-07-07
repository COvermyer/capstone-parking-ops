import * as vehicleMakeCodeDAO from './vehicle-make-code.dao';

export const getVehicleMakeCodes = async () => {
    return vehicleMakeCodeDAO.readVehicleMakeCodes();
}

export const getVehicleMakeCode = async (make_id: number) => {
    return vehicleMakeCodeDAO.readVehicleMakeCodeById(make_id);
}

export const getVehicleMakeCodeByName = async (make_name: string) => {
    return vehicleMakeCodeDAO.readVehicleMakeCodeByName(make_name);
}