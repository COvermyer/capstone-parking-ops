/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-model.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export interface CitationOffenseCode {
    offence_code_id: number;
    offence_code: string;
    offence_name: string;
    charge: number;
    apealable: boolean;
    created: string;
}