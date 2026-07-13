import bcrypt from 'bcrypt';
import * as userCredentialService from '../user-credentials/user-credential.service';
import * as jwtService from "../../services/jwt.service";
import { AuthenticatedUser } from '../../types/authenticated-user';

export const login = async (username: string, password: string) => {
    const credential = (await userCredentialService.getUserCredentialByUsername(username))[0];

    if (!credential)
        throw new Error("Invalid username or password");

    // verify password
    const validPassword = await bcrypt.compare(password, credential.password_hash);

    if (!validPassword)
        throw new Error("Invalid username or password");

    const authenticatedUser = {
        user_id: credential.user_id,
        username: credential.username,
    }
    
    // generate JWT token
    const token = jwtService.generateToken(authenticatedUser as AuthenticatedUser);

    return({ token });
}


// async login(
//         username: string,
//         password: string
//     ) {
        
//     }
// export default AuthService;