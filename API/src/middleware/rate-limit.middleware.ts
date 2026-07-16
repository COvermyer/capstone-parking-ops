/**
 * Author: Caleb Overmyer
 * Filename: rate-limit.middleware.ts
 * Created: 07/15/2026
 */
import { rateLimit } from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
    limit: 100, // 100 requests
    windowMs: 60 * 1000, // per minute
    standardHeaders: true,
    legacyHeaders: false
});

export const loginRateLimiter = rateLimit({
    limit: 5, // 5 requests
    windowMs: 15 * 60 * 1000, // per 15 minutes
    skipSuccessfulRequests: true, // don't count successful login attempts towards the rate limit

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        error: 'For security purposes, login attempts have been restricted. Please try again in 15 minutes.'
    }
});