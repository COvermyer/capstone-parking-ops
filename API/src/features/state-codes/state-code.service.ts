import * as stateCodeDAO from './state-code.dao';

export const getAllStateCodes = async () => {
    return stateCodeDAO.readStateCodes();
}

export const getStateCodeByStateId = async (state_id: number) => {
    return stateCodeDAO.readStateCodeByStateId(state_id);
}

export const getStateCodeByStateName = async (state_name: string) => {
    return stateCodeDAO.readStateCodeByStateName(state_name);
}

export const getStateCodeByStateAbbreviation = async (state_abbreviation: string) => {
    return stateCodeDAO.readStateCodeByStateAbbreviation(state_abbreviation);
}