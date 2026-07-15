import * as passwordService from './services/password.service';

export const generateHash = async () => {
    const password = 'pass';
    const hash = await passwordService.hashPassword(password);

    console.log('Password: ', password);
    console.log('Hash: ', hash);
};
