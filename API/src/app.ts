/**
 * Author: Caleb Overmyer
 * Filename: app.ts
 * Created: 07/06/2026
 * Last Updated: 07/13/2026
 */
// external package imports
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import "dotenv/config";
import cors from 'cors';
import helmet from 'helmet';
import https from 'https';
import fs from 'fs';
import path from 'path';

// internal imports
import logger from './middleware/logger.middleware';
// import { AuthenticatedRequest } from './types/authenticated-request';
import lookupService from './services/lookup.service';
import userRoutes from './features/users/user.routes';
// import userRoleCodeRoutes from './features/user-role-codes/user-role-codes.routes';
// import stateCodeRoutes from './features/state-codes/state-code.routes';
// import appealStatusCodeRoutes from './features/appeal-status-codes/appeal-status-code.routes';
// import colorCodeRoutes from './features/color-codes/color-code.routes';
import authRoutes from './features/auth/auth.routes';
import { apiRateLimiter } from './middleware/rate-limit.middleware';
import { errorHandler } from './middleware/error-handler.middleware';
// import { authenticatedRequest } from './middleware/request-auth.middleware';

dotenv.config({ quiet: true }); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 3000;

// Use all cors
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Helmet security middleware
app.use(helmet());

// Rate limiting
app.set('trust proxy', 1); // trust the proxy to receive client IP
app.use(apiRateLimiter); // Limit api requests to 100 per minute per user

// Add routers
app.use('/api', userRoutes);
// app.use('/api', userRoleCodeRoutes);
// app.use('/api', stateCodeRoutes);
// app.use('/api', appealStatusCodeRoutes);
// app.use('/api', colorCodeRoutes);
app.use('/auth', authRoutes);

// health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date()
    });
});

// Error Handling middleware
app.use(errorHandler);


/**
 * Server start function that initializes the lookup service and starts the Express server.
 * It also configures environment-specific settings, such as logging middleware for development mode.
 * The server listens on the specified port and logs relevant information to the console.
 */
async function start() {
    try {
        if (process.env.NODE_ENV === 'production') {
                // Production-specific settings can be added here
                console.warn('[app.ts][start][WARN] Running in production mode');
        } else if (process.env.NODE_ENV === 'development') {
            app.use(logger); // Use the logger middleware in development mode
        } 

        // Initialize the lookup service to populate static lookup tables in memory
        await lookupService.initialize();

        // Generate or retrieve a trusted localhost certificate
        const tlsOptions = {
            key: fs.readFileSync(
                path.resolve(process.cwd(), 'certs/localhost-key.pem')
            ),
            cert: fs.readFileSync(
                path.resolve(process.cwd(), 'certs/localhost.pem')
            ),
            minVersion: 'TLSv1.2' as const
        }

        // Create HTTPS server
        const server = https.createServer(tlsOptions, app);

        server.listen(port, () => {
            // console.log(`Server is running on port ${port}`);
            console.log(`[app.ts][start][Info] Running at: https://localhost:${port}`);
            console.log(`[app.ts][start][Info] Environment: ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.log(`[app.ts][start][ERROR] Failed to start: ${error}`);
        process.exit(1);
    }
}

// Start the server
start();

