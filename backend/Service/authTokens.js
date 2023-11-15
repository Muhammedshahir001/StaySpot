import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//---------------------------------------------Password hasher----------------------------------------//


export function passwordHasher(password) {
    const pass = bcrypt.hash(password, 10);
    return pass;
};