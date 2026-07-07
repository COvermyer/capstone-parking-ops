import { execute } from '../../services/mysql.connector';
import { CitationStatusCode } from './citation-status-code.model';
import { citationStatusCodeQueries } from './citation-status-code.queries';

export const readCitationStatusCodes = async () => {
    return execute<CitationStatusCode[]>(citationStatusCodeQueries.getCitationStatusCodes, []);
};

export const readCitationStatusCodesById = async (status_code: number) => {
    return execute<CitationStatusCode[]>(citationStatusCodeQueries.getCitationStatusCodeById, [status_code]);
}