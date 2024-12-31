import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {IStaffWorkService} from "../services/staffWord/IStaffWordService";
import {StaffWorkCreateRequest} from "../models/staffWord/StaffWordCreateRequest";

@injectable()
export class StaffWorkController {
    constructor(@inject("IStaffWorkService") private readonly staffWorkService: IStaffWorkService) {
    }

    async findAll(req: Request, res: Response) {
        const staffWorks = await this.staffWorkService.findAll();

        res.status(200).json(staffWorks);
    }

    async create(req: Request, res: Response) {
        const dto = plainToInstance(StaffWorkCreateRequest, req.body);

        const errors = await validate(dto);
        if (errors.length > 0) {
            const messages = errors.map(err => Object.values(err.constraints || {}).join(", "));
            return res.status(400).json({message: messages});
        }

        try {
            let isSuccess = await this.staffWorkService.create(dto);
            if (isSuccess) {
                res.status(201).json({message: '員工工作資料創建成功'});
                return;
            }
            res.status(400).json({message: '員工工作資料已存在'});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params; // 路由參數
        let isSuccess = await this.staffWorkService.deleted(parseInt(id));
        if (isSuccess) {
            res.status(200).json({message: '員工工作資料刪除成功'});
            return;
        }
        res.status(400).json({message: '員工工作資料刪除失敗'});
    }
}
