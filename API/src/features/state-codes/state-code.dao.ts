/**
 * Author: Caleb Overmyer
 * Filename: state-code.dao.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import { execute } from '../../services/mysql.connector';
import { StateCode } from './state-code.model';
import { stateCodeQueries } from './state-code.queries';

export const readStateCodes = async () => {
    return execute<StateCode[]>(stateCodeQueries.getAllStateCodes, []);
}

export const readStateCodeByStateId = async (state_id: number) => {
    return execute<StateCode[]>(stateCodeQueries.getStateCodeByStateId, [state_id]);
}

export const readStateCodeByStateName = async (state_name: string) => {
    return execute<StateCode[]>(stateCodeQueries.getStateCodeByStateName, [state_name]);
}

export const readStateCodeByStateAbbreviation = async (state_abbreviation: string) => {
    return execute<StateCode[]>(stateCodeQueries.getStateCodeByStateAbbreviation, [state_abbreviation]);
}