/**
 * Author: Caleb Overmyer
 * Filename: authenticated-request.ts
 * Created: 07/06/2026
 * Last Updated: 07/13/2026
 */
import { Request } from "express";
import { JwtPayload } from "../../types/jwt-payload";

/**
 * This class enforces the need for a JwtPayload before making a Request
 */
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}