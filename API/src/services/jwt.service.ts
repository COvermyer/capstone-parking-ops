/**
 * Author: Caleb Overmyer
 * Filename: jwt.service.ts
 * Created: 07/10/2026
 * Last Updated: 07/13/2026
 * 
 * Acts as the JWT generation and verification source of truth
 */
import jwt, { SignOptions} from 'jsonwebtoken';
import { AuthenticatedUser } from "../features/auth/authenticated-user"
import { JwtPayload } from '../types/jwt-payload';

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '15m') as SignOptions["expiresIn"];
const JWT_ISSUER = process.env.JWT_ISSUER || 'capstone-parking-ops-api-default-issuer';
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || 'capstone-parking-ops-default-client';

// validate configuration
if (!JWT_SECRET || Buffer.byteLength(JWT_SECRET, 'utf8') < 32) {
    throw new Error('JWT_SECRET must be configured with at least 32 bytes of secret material');
}

export const generateToken = (user: JwtPayload): string => {
    return jwt.sign(
        user,
        JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: JWT_EXPIRES_IN,
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE
        }
    )
}

/**
 * Verifies a JWT token's authenticity
 * @param token The token to verify
 * @returns A JwtPayload object containing user info associated with JWT
 */
export const verifyToken = (token: string): JwtPayload => {
    const decoded =  jwt.verify(
        token,
        JWT_SECRET,
        {
            algorithms: ['HS256'],
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE
        }
    );

    // JWT must be an object, not a string or other value
    if (typeof decoded !== 'object' || decoded == null || Array.isArray(decoded)) {
        throw new Error('Invalid JWT payload signature');
    }

    const claims = decoded as Record<string, unknown>;

    // require a valid internal id
    if (
        typeof claims.user_id !== 'number' ||
        !Number.isSafeInteger(claims.user_id) ||
        claims.user_id <= 0
    ) {
        throw new Error('Invalid JWT user_id claim');
    }

    // require an expiration claim
    if (
        typeof claims.exp !== 'number' ||
        !Number.isSafeInteger(claims.exp)
    ) {
        throw new Error('JWT expiration claim is missing or invalid');
    }

    return {
        user_id: claims.user_id
    };
};