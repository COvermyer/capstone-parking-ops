/**
 * Author: Caleb Overmyer
 * Filename: update-query.model.ts
 * Created: 07/16/2026
 * 
 * This model serves as a wrapper for the query builders used byu the update clause for PATCH requests
 */
export interface UpdateQuery {
    sql: string,
    values: unknown[],
}