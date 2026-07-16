/**
 * Author: Caleb Overmyer
 * Filename: validation.error.ts
 * Created: 07/16/2026
 */
import { AppError } from "./app.error";

export class ValidationError extends AppError {
    constructor(message = "Invalid request") {
        super(message, 400);
    }
}