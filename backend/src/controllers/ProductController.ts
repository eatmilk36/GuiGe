import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {IProductService} from "../services/product/IProductService";
import {ProductCreateRequest} from "../models/product/ProductCreateRequest";

@injectable()
export class ProductController {
    constructor(@inject("IProductService") private readonly productService: IProductService) {
    }

    async findAll(req: Request, res: Response) {
        const productEntities = await this.productService.findAll();

        res.status(200).json(productEntities);
    }

    async create(req: Request, res: Response) {
        const dto = plainToInstance(ProductCreateRequest, req.body);

        const errors = await validate(dto);
        if (errors.length > 0) {
            const messages = errors.map(err => Object.values(err.constraints || {}).join(", "));
            return res.status(400).json({message: messages});
        }

        try {
            let isSuccess = await this.productService.create(dto);
            if (isSuccess) {
                res.status(201).json({message: '產品創建成功'});
                return;
            }
            res.status(400).json({message: '產品已存在'});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params; // 路由參數
        let isSuccess = await this.productService.deleted(parseInt(id));
        if (isSuccess) {
            res.status(200).json({message: '產品刪除成功'});
            return;
        }
        res.status(400).json({message: '產品刪除失敗'});
    }
}
