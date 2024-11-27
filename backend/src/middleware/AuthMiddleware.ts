import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_jwt_secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer Token

    if (!token) {
        res.status(401).json({ message: 'Access token is missing or invalid' });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }

        // 資後更了解後再解決
        // req.user = user;
        next();
    });
};
