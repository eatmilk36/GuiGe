import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer Token

    if (!token) {
        res.status(401).json({ message: '存取權杖缺失或無效' });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, _) => {
        if (err) {
            res.status(403).json({ message: '權杖無效' });
            return;
        }

        // 資後更了解後再解決
        // req.user = user;
        next();
    });
};
