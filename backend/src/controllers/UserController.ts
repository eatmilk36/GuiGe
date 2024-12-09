import {Request, Response} from 'express';
import {RegisterUserDto} from "../models/RegisterUserDto";
import {validate} from "class-validator";
import {plainToInstance} from "class-transformer";
import {inject, injectable} from "tsyringe";
import {IUserService} from "../services/user/IUserService";

@injectable()
export class UserController {
    constructor(@inject("IUserService") private readonly userService: IUserService) {}

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
            res.status(201).json({message: 'user registered successfully'});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async findAll(req: Request, res: Response) {
        let users = await this.userService.findAll();
        res.status(200).json(users);
    }
}