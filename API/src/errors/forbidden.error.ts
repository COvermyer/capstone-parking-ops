/**
 * Author: Caleb Overmyer
 * Filename: forbidden.error.ts
 * Created: 07/16/2026
 */
import { AppError } from "./app.error";

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}