import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {UserService} from '../services/UserService';
import {UserRepository} from '../repository/UserRepository'
import {RegisterUserDto} from "../models/RegisterUserDto";
import {validate} from "class-validator";
import {plainToInstance} from "class-transformer";

let userService: UserService;
userService = new UserService(new UserRepository());
const SECRET_KEY = 'your_jwt_secret';

export class AuthController {
    async login(req: Request, res: Response) {
        const {username, password} = req.body;
        const isValid = await userService.validateUser(username, password);
        if (!isValid) return res.status(401).json({message: 'Invalid credentials'});

        const token = jwt.sign({username}, SECRET_KEY, {expiresIn: '1h'});
        res.json({token});
    }

    async register(req: Request, res: Response) {
        // 將 req.body 轉換為 RegisterUserDto
        const dto = plainToInstance(RegisterUserDto, req.body);

        // 驗證 DTO
        const errors = await validate(dto);
        if (errors.length > 0) {
            // 格式化錯誤訊息
            const messages = errors.map(err => Object.values(err.constraints || {}).join(", "));
            return res.status(400).json({message: messages});
        }

        try {
            await userService.register(dto.username, dto.password, dto.email);
            res.status(201).json({message: 'User registered successfully'});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}
