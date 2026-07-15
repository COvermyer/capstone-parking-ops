/**
 * Author: Caleb Overmyer
 * Filename: password.service.ts
 * Created: 2026-07-15
 * Last updated: 2026-07-15
 */
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PEPPER;
const rounds = Number(process.env.BCRYPT_ROUNDS);

if (!pepper) {
    throw new Error("Environment variable BCRYPT_PEPPER is not configured.");
}

if (!Number.isInteger(rounds) || rounds < 10) {
    throw new Error("Environment variable BCRYPT_ROUNDS must be an integer greater than or equal to 10");
}

const applyPepper = (password: string) => {
    return `${pepper}:${password}`;
};

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(applyPepper(password), rounds);
};

export const verifyPassword = async (password: string, hash: string) : Promise<boolean> => {
    return await bcrypt.compare(applyPepper(password), hash);
};

export const validatePassword = (password: string): boolean => {
    return false; // TODO: configure password validation rules (Uppercase, lowercase, special character, etc)
};