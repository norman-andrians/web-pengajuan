import bcrypt from 'bcrypt';

const chars = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP1234567890$%&#@*";

export const randomChar = (len: number) => {
    let char = ""

    for (let b = 0; b < len; b++) {
        const random = Math.floor(Math.random() * chars.length);
        char += chars[random];
    }

    return char;
}

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);

export const generateToken = (): string => {
    return randomChar(160);
}