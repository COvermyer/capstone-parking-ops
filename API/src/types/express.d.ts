/**
 * Author: Caleb Overmyer
 * Filename: express.d.ts
 * Created: 07/13/2026
 * Last Updated: 07/13/2026
 */
// import { AuthenticatedUser } from "../features/auth/authenticated-user";
import { JwtPayload } from "./jwt-payload";

/**
 * Enforces the usage of the JwtPayload model with any Request body
 */
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export {};