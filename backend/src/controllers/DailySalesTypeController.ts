import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {IDailySalesTypeService} from "../services/dailySalesType/IDailySalesTypeService";
import {DailySalesTypeCreateRequest} from "../models/dailySalesType/DailySalesTypeCreateRequest";

@injectable()
export class DailySalesTypeController {
    constructor(@inject("IDailySalesTypeService") private readonly dailySalesTypeService: IDailySalesTypeService) {
    }

    async findAll(req: Request, res: Response) {
        const dailySalesTypeType = await this.dailySalesTypeService.findAll();

        res.status(200).json(dailySalesTypeType);
    }

    async create(req: Request, res: Response) {
        const dto = plainToInstance(DailySalesTypeCreateRequest, req.body);

        const errors = await validate(dto);
        if (errors.length > 0) {
            const messages = errors.map(err => Object.values(err.constraints || {}).join(", "));
            return res.status(400).json({message: messages});
        }

        try {
            let isSuccess = await this.dailySalesTypeService.create(dto);
            if (isSuccess) {
                res.status(201).json({message: '每日銷售類型創建成功'});
                return;
            }
            res.status(400).json({message: '每日銷售類型已存在'});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}
