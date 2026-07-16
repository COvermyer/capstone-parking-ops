/**
 * Author: Caleb Overmyer
 * Filename: app.error.ts
 * Created: 07/16/2026
 */

/**
 * Base application error
 * All expected API errors should extend this class
 * 
 * Custom errors help for code readability in controllers, replacing constant 
 * `return res.status(404).json(...)` calls
 */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        statusCode: number
    ) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = true;

        Object.setPrototypeOf(
            this,
            AppError.prototype
        );
    }
}