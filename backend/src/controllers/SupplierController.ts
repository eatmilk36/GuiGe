import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import {ISupplierService} from "../services/supplier/ISupplierService";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {SupplierCreateRequest} from "../models/supplier/SupplierCreateRequest";

@injectable()
export class SupplierController {
    constructor(@inject("ISupplierService") private readonly supplierService: ISupplierService) {
    }

    async findAll(req: Request, res: Response) {
        const suppliers = await this.supplierService.findAll();

        res.status(200).json(suppliers);
    }

    async create(req: Request, res: Response) {
        const dto = plainToInstance(SupplierCreateRequest, req.body);

        const errors = await validate(dto);
        if (errors.length > 0) {
            const messages = errors.map(err => Object.values(err.constraints || {}).join(", "));
            return res.status(400).json({message: messages});
        }

        try {
            let isSuccess = await this.supplierService.create(dto);
            if (isSuccess) {
                res.status(201).json({message: '供應商資料創建成功'});
                return;
            }
            res.status(400).json({message: '供應商資料已存在'});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params; // 路由參數
        let isSuccess = await this.supplierService.deleted(parseInt(id));
        if (isSuccess) {
            res.status(200).json({message: '供應商資料刪除成功'});
            return;
        }
        res.status(400).json({message: '供應商資料刪除失敗'});
    }
}
