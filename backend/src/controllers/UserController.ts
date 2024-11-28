import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {UserService} from '../services/UserService';
import {RegisterUserDto} from "../models/RegisterUserDto";
import {validate} from "class-validator";
import {plainToInstance} from "class-transformer";
import {injectable} from "tsyringe";

const SECRET_KEY = process.env.SECRET_KEY;

@injectable()
export class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async login(req: Request, res: Response) {
        const {username, password} = req.body;
        const isValid = await this.userService.validateUser(username, password);
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
            await this.userService.register(dto.username, dto.password, dto.email);
            res.status(201).json({message: 'User registered successfully'});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async findAll(req: Request, res: Response) {
        let users = await this.userService.findAll();
        res.status(200).json(users);
    }
}