import { execute } from '../../services/mysql.connector';
import { AppealStatusCode } from './appeal-status-code.model';
import { appealStatusCodeQueries } from './appeal-status-code.queries';

export const readAppealStatusCodes = async () => {
    return execute<AppealStatusCode[]>(appealStatusCodeQueries.getAppealStatusCodes, []);
}

export const readAppealStatusCodeById = async (appeal_status_code: number) => {
    return execute<AppealStatusCode[]>(appealStatusCodeQueries.getAppealStatusCodeById, [appeal_status_code]);
}