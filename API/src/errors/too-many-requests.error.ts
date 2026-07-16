/**
 * Author: Caleb Overmyer
 * Filename: too-many-requests.error.ts
 * Created: 07/16/2026
 */
import { AppError } from "./app.error";

export class TooManyRequestsError extends AppError {
    constructor(message = "Too many requests.") {
        super(message, 429);
    }
}