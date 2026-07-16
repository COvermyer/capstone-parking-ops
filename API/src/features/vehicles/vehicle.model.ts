/**
 * Author: Caleb Overmyer
 * Filename: vehicle.model.ts
 * Created: 07/15/2026
 */
export interface Vehicle {
    vehicle_id: number,
    user_id: number | null,
    color_id: number,
    year: number,
    make_id: number,
    state_id: number,
    plate_number: string,
    vin: string | null,
    created?: string
};

export interface CreateVehicleRequest {
    user_id?: number | null,
    color_id: number,
    year: number,
    make_id: number,
    state_id: number,
    plate_number: string,
    vin?: string | null
};

export interface UpdateVehicleRequest {
    user_id?: number,
    color_id?: number,
    year?: number,
    make_id?: number,
    state_id?: number,
    plate_number?: string,
    vin?: string
};