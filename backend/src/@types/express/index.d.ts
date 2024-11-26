import * as express from 'express';
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: string | jwt.JwtPayload; // 根據你的需求定義 user 的類型
        }
    }
}
