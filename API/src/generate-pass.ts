import bcrypt from 'bcrypt';

export const generateHash = async () => {
    const password = 'pass';
    const hash = await bcrypt.hash(password, 10);

    console.log('Password: ', password);
    console.log('Hash: ', hash);
};
