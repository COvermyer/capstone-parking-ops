/**
 * Author: Caleb Overmyer
 * Filename: citation-offense-model.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
export interface CitationOffenseCode {
    offense_code_id: number;
    offense_code: string;
    offense_name: string;
    charge: number;
    appealable: boolean;
    created: string;
}