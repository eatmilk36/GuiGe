import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import {IDailySalesService} from "../services/dailySales/IDailySalesService";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {DailySalesCreateRequest} from "../models/dailySales/DailySalesCreateRequest";

@injectable()
export class DailySalesController {
    constructor(@inject("IDailySalesService") private readonly dailySalesService: IDailySalesService) {
    }

    async findAll(req: Request, res: Response) {
        const dailySales = await this.dailySalesService.findAll();

        res.status(200).json(dailySales);
    }

    async create(req: Request, res: Response) {
        const dto = plainToInstance(DailySalesCreateRequest, req.body);

        const errors = await validate(dto);
        if (errors.length > 0) {
            const messages = errors.map(err => Object.values(err.constraints || {}).join(", "));
            return res.status(400).json({message: messages});
        }

        try {
            let isSuccess = await this.dailySalesService.create(dto);
            if (isSuccess) {
                res.status(201).json({message: 'DailySalesEntity created successfully'});
                return;
            }
            res.status(400).json({message: 'DailySalesEntity already exists'});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}
