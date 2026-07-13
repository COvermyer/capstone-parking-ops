/**
 * Author: Caleb Overmyer
 * Filename: auth.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/10/2026
 */
import bcrypt from 'bcrypt';
import * as userCredentialService from '../user-credentials/user-credential.service';
import * as userService from '../users/user.service'
import * as jwtService from "../../services/jwt.service";
import { AuthenticatedUser } from './authenticated-user';

export const login = async (username: string, password: string) => {
    const credential = (await userCredentialService.getUserCredentialByUsername(username))[0];
    

    if (!credential)
        throw new Error("Invalid username or password");

    // verify password
    const validPassword = await bcrypt.compare(password, credential.password_hash);

    if (!validPassword)
        throw new Error("Invalid username or password");

    const user = (await userService.getUserByUsername(username))[0];
    const authenticatedUser: AuthenticatedUser = {
        user_id: credential.user_id,
        company_id: user.company_id,
        username: credential.username,
        first_name: user.first_name,
        last_name: user.last_name,
        roles: user.roles,
        email: user.email
    }
    
    // generate JWT token
    const token = jwtService.generateToken(authenticatedUser);

    return({ 
        token,
        user: authenticatedUser
    });
}