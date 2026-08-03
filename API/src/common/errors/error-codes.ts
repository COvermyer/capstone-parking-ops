/**
 * Author: Caleb Overmyer
 * Filename: app.error.ts
 * Created: 08/03/2026
 */

/**
 * Used to define HTTP status codes within the API to remove 'magic numbers' and improve code readability
 * 
 * Example usage:
 * return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "User not found" });
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,

    MOVED_PERMANENTLY: 301,
    
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    TOO_MANY_REQUESTS: 429,

    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    SERVICE_UNAVAILABLE: 503,
};