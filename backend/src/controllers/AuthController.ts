import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import {IAuthService} from "../services/auth/IAuthService";

@injectable()
export class AuthController {
    constructor(@inject("IAuthService") private readonly authService: IAuthService) {}

    // login 方法
    async login(req: Request, res: Response): Promise<Response> {
        const {username, password} = req.body;

        try {
            // 驗證用戶並生成 Token
            const token = await this.authService.validateUser(username, password);

            if (!token) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

            return res.status(200).json({token});
        } catch (error) {
            return res.status(500).json({message: 'Internal server error', error: error.message});
        }
    }

    // Renew Token 方法
    async renewToken(req: Request, res: Response): Promise<Response> {
        try {
            const oldToken = req.headers['authorization'].split(' ')[1];
            const newToken = await this.authService.newToken(oldToken);

            return res.status(200).json({token: newToken});
        } catch (error) {
            return res.status(500).json({message: 'Internal server error', error: error.message});
        }
    }
}
