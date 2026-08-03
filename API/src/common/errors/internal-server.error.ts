/**
 * Author: Caleb Overmyer
 * Filename: internal-server.error.ts
 * Created: 07/16/2026
 */
import { AppError } from "./app.error";

export class InternalServerError extends AppError {
    constructor(message = "Internal server error") {
        super(message, 500);
    }
}