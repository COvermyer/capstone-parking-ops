/**
 * Author: Caleb Overmyer
 * Filename: lookup.service.ts
 * Created: 2024-07-10
 * Last Modified: 2024-07-10
 * 
 * Description: 
 * This file contains the LookupService class, which is responsible for managing static lookup tables in memory.
 * The LookupService class provides methods to initialize and access lookup data, such as user roles.
 * This service is used throughout the application to provide consistent and efficient access to lookup data.
 * The initialize method populates the lookup tables with predefined values, ensuring that the application has access to necessary reference data at runtime.
 * This file is part of the service layer of the application and serves as a centralized point for managing lookup data.
 */
import * as userRoleCodeService from '../features/user-role-codes/user-role-code.service';
import * as stateCodeService from '../features/state-codes/state-code.service';
import * as permitStatusCodeService from '../features/permit-status-codes/permit-status-code.service';
import * as appealStatusCodeService from '../features/appeal-status-codes/appeal-status-code.service';
import * as colorCodeService from '../features/color-codes/color-code.service';
import * as citationOffenseCodeService from '../features/citation-offense-codes/citation-offense-code.service';
import { CitationOffenseCode } from '../features/citation-offense-codes/citation-offense-code.model';
import * as citationStatusCodeService from '../features/citation-status-codes/citation-status-code.service';

/**
 * Acts as a registry of all lookup tables to eliminate repeated database queries/excessive pool usage for static data
 */
class LookupService {
    // Static lookup tables stored in memory
    public userRoles: Map<number, string> = new Map<number, string>();
    public stateCodes: Map<number, string[]> = new Map<number, string[]>();
    public permitStatusCodes: Map<number, string> = new Map<number, string>();
    public appealStatusCodes: Map<number, string> = new Map<number, string>();
    public colorCodes: Map<number, string> = new Map<number, string>();
    public citationOffenseCodes: Map<number, CitationOffenseCode> = new Map<number, CitationOffenseCode>();
    public citationStatusCodes: Map<number, string> = new Map<number, string>();

    async initialize() {
        // Use lookup table DAOs to populate static lookup tables in memory
        try {
            // User Role Codes
            let userRoleEntities = await userRoleCodeService.getUserRoles();
            userRoleEntities.forEach(role => {
                this.userRoles.set(role.role_id, role.role_name);
            });

            // State Codes
            let stateCodeEntities = await stateCodeService.getAllStateCodes();
            stateCodeEntities.forEach(state => {
                this.stateCodes.set(state.state_id, [state.state_name, state.state_abbreviation]);
            });

            // Permit Status Codes
            let permitStatusCodeEntities = await permitStatusCodeService.getPermitStatusCodes();
            permitStatusCodeEntities.forEach(status => {
                this.permitStatusCodes.set(status.status_code, status.status_message);
            });

            // appeal status codes
            let appealStatusCodeEntities = await appealStatusCodeService.getAppealStatusCodes();
            appealStatusCodeEntities.forEach(status => {
                this.appealStatusCodes.set(status.appeal_status_code, status.status_message);
            });

            // color codes
            let colorCodeEntities = await colorCodeService.getColorCodes();
            colorCodeEntities.forEach(color => {
                this.colorCodes.set(color.color_id, color.color_name);
            });

            // Citation Offense codes
            let citationOffenseCodeEntities = await citationOffenseCodeService.getCitationOffenseCodes();
            citationOffenseCodeEntities.forEach(offenseCode => {
                this.citationOffenseCodes.set(offenseCode.offence_code_id, offenseCode as CitationOffenseCode);
            });

            // Citation Status Codes
            let citationStatusCodeEntities = await citationStatusCodeService.getCitationStatusCodes();
            citationStatusCodeEntities.forEach(statusCode => {
                this.citationStatusCodes.set(statusCode.status_code, statusCode.status_message);
            })


            // Log the number of entries in each lookup table
            console.log(`[LookupService][initialize][Success]: Initialized userRoles lookup table with ${this.userRoles.size} entries`);
            console.log(`[LookupService][initialize][Success]: Initialized stateCodes lookup table with ${this.stateCodes.size} entries`);
            console.log(`[LookupService][initialize][Success]: Initialized permitStatusCodes lookup table with ${this.permitStatusCodes.size} entries`);
            console.log(`[LookupService][initialize][Success]: Initialized appealStatusCodes lookup table with ${this.appealStatusCodes.size} entries`);
            console.log(`[LookupService][initialize][Success]: Initialized colorCodes lookup table with ${this.colorCodes.size} entries`);
            console.log(`[LookupService][initialize][Success]: Initialized citationOffenseCodes lookup table with ${this.citationOffenseCodes.size} entries`);
            console.log(`[LookupService][initialize][Success]: Initialized citationStatusCodes lookup table with ${this.citationStatusCodes.size} entries`);
            // console.log('[LookupService][initialize][Success]: Lookup tables initialized');
        } catch (error) {
            console.error('[LookupService][initialize][Error]:', error);
        }
    }

    // Getters for UserRoleCode
    getRole(id: number): string | undefined {
        return this.userRoles.get(id);
    }

    getAllRoles(): Map<number, string> {
        return this.userRoles;
    }

    // Getters for StateCode
    getStateCode(id: number): string[] | undefined {
        return this.stateCodes.get(id);
    }

    getAllStateCodes(): Map<number, string[]> {
        return this.stateCodes;
    }
}

export default new LookupService();