/**
 * Author: Caleb Overmyer
 * Filename: state-code.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { PoolConnection } from 'mysql';
import * as stateCodeDAO from './state-code.dao';
import { AppError } from '../../common/errors/app.error';
import { HTTP_STATUS } from '../../common/errors/error-codes';
import { StateCode } from './state-code.model';

export const getAllStateCodes = async (connection?: PoolConnection): Promise<StateCode[]> => {
    const stateCodes = await stateCodeDAO.readStateCodes(connection);
    if (stateCodes.length === 0) {
        throw new AppError("No state codes found", HTTP_STATUS.NOT_FOUND);
    }

    return stateCodes;
};


/**
 * TODO: Refactor getStateCodeByStateId, getStateCodeByStateName, and getStateCodeByStateAbbreviation to use a single function that takes a key and value parameter. 
 * This will reduce code duplication and make the service more maintainable.
 */

export const getStateCodeByStateId = async (state_id: number, connection?: PoolConnection): Promise<StateCode[]> => {
    const stateCode = await stateCodeDAO.readStateCodeByStateId(state_id, connection);
    if (!stateCode) {
        throw new AppError("State code not found", HTTP_STATUS.NOT_FOUND);
    }
    return stateCode;
};

export const getStateCodeByStateName = async (state_name: string, connection?: PoolConnection): Promise<StateCode[]> => {
    const stateCode = await stateCodeDAO.readStateCodeByStateName(state_name, connection);
    if (!stateCode) {
        throw new AppError("State code not found", HTTP_STATUS.NOT_FOUND);
    }
    return stateCode;
};


export const getStateCodeByStateAbbreviation = async (state_abbreviation: string, connection?: PoolConnection): Promise<StateCode[]> => {
    const stateCode = await stateCodeDAO.readStateCodeByStateAbbreviation(state_abbreviation, connection);
    if (!stateCode) {
        throw new AppError("State code not found", HTTP_STATUS.NOT_FOUND);
    }
    return stateCode;
};

/**
 * TODO: Implement
 * createStateCode, 
 * updateStateCode, 
 * deleteStateCode
 */