/**
 * Author: Caleb Overmyer
 * Filename: not-found.error.ts
 * Created: 07/16/2026
 */
import { AppError } from "./app.error";

export class NotFoundError extends AppError {
    constructor(message = "Not found") {
        super(message, 404);
    }
}