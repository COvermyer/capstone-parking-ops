/**
 * Author: Caleb Overmyer
 * Filename: unauthorized.error.ts
 * Created: 07/16/2026
 */
import { AppError } from "./app.error";

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}