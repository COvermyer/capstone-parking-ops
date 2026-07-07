export const vehicleMakeCodeQueries = {
    getAllVehicleMakeCodes: `SELECT * FROM vehicle_make_codes;`,
    getVehicleMakeCodeById: `SELECT * FROM vehicle_make_codes WHERE vehicle_make_id = ?;`,
    getVehicleMakeCodeByName: `SELECT * FROM vehicle_make_codes WHERE make_name = ?;`,
}