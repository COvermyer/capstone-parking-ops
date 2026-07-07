import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import logger from './middleware/logger.middleware';
import lookupService from './services/lookup.service';
import userRoutes from './features/users/user.routes';
import userRoleCodeRoutes from './features/user-role-codes/user-role-codes.routes';
import stateCodeRoutes from './features/state-codes/state-code.routes';
import appealStatusCodeRoutes from './features/appeal-status-codes/appeal-status-code.routes';
import colorCodeRoutes from './features/color-codes/color-code.routes';

dotenv.config({ quiet: true }); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 3000;

// Parse incoming JSON requests
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Use all cors
app.use(cors());
// Helmet security middleware
app.use(helmet());

let routes = [
    userRoutes, 
    userRoleCodeRoutes, 
    stateCodeRoutes,
    appealStatusCodeRoutes,
    colorCodeRoutes,
]; 

// Add routers
app.use('/api', routes); 

// Define a simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

/**
 * Server start function that initializes the lookup service and starts the Express server.
 * It also configures environment-specific settings, such as logging middleware for development mode.
 * The server listens on the specified port and logs relevant information to the console.
 */
async function start() {
    app.listen(port, () => {
        // console.log(`Server is running on port ${port}`);
        console.log(`Running at: http://localhost:${port}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    });

    // Initialize the lookup service to populate static lookup tables in memory
    await lookupService.initialize();

    if (process.env.NODE_ENV === 'production') {
        // Production-specific settings can be added here
        console.log('Running in production mode');
    } else if (process.env.NODE_ENV === 'development') {
        app.use(logger); // Use the logger middleware in development mode
    }  
}

// Start the server
start();

