import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import {ISupplierService} from "../services/supplier/ISupplierService";

@injectable()
export class SupplierController {
    constructor(@inject("ISupplierService") private readonly supplierService: ISupplierService) {
    }

    async findAll(req: Request, res: Response) {
        const suppliers = await this.supplierService.findAll();

        res.status(200).json(suppliers);
    }
}
