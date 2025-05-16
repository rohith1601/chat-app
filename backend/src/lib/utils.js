import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
export const generateToken = (userId, res) =>{
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development', // Set to true if using HTTPS
        sameSite: 'strict', // CSRF protection
    });
}