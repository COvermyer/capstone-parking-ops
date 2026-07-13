/**
 * Author: Caleb Overmyer
 * Filename: logger.middleware.ts
 * Created: 07/10/2026
 * Last Updated: 07/13/2026
 */
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Takes machine time and converts it to human readable operation time
 * @param time The DateTime object with a given time span
 * @returns the time a process took formatted in human readable time measurements
 */
const getProcessingTimeInMs = (time: [number, number]): string => {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`
};

/**
 * Middleware function to log processes, each given a UUID
 * @param req request body
 * @param res response object
 * @param next Middleware handler
 */
export default function logger(req:Request, res:Response, next:NextFunction) {
    // generate unique identifier
    const id = uuidv4();

    // get timestamp
    const now = new Date();
    const timestamp = [now.getFullYear(), '-', now.getMonth() + 1, '-', now.getDate(), ' ', 
        now.getHours(), ':', now.getMinutes(), ':', now.getSeconds()
    ].join('');

    // get api endpoint
    const { method, url } = req;

    // log start of execution time
    const start = process.hrtime();
    const startText = `START:${getProcessingTimeInMs(start)}`;
    const idText = `[${id}]`;
    const timeStampText = `[${timestamp}]`;

    // all components ready, show the entry
    console.log(`${idText}${timeStampText} ${method}:${url} ${startText}`);

    // trigger once a response is sent to the client
    res.once('finish', () => {
        // log end of the execution process
        const end = process.hrtime(start);
        const endText = `END:${getProcessingTimeInMs(end)}`;
        console.log(`${idText}${timeStampText} ${method}:${url} ${res.statusCode} ${endText}`);
    });

    // execute next middleware handler
    next();
};