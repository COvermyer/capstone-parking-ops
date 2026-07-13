/**
 * Author: Caleb Overmyer
 * Filename: vehicle-make-code.queries.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export const vehicleMakeCodeQueries = {
    getAllVehicleMakeCodes: `SELECT * FROM vehicle_make_codes;`,
    getVehicleMakeCodeById: `SELECT * FROM vehicle_make_codes WHERE vehicle_make_id = ?;`,
    getVehicleMakeCodeByName: `SELECT * FROM vehicle_make_codes WHERE make_name = ?;`,
}