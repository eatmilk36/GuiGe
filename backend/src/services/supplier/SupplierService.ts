import {inject, injectable} from "tsyringe";
import {ISupplierService} from "./ISupplierService";
import {ISupplierRepository} from "../../repository/supplier/ISupplierRepository";
import {SupplierEntity} from "../../entities/SupplierEntity";
import {SupplierCreateRequest} from "../../models/supplier/SupplierCreateRequest";

@injectable()
export class SupplierService implements ISupplierService {
    constructor(@inject("ISupplierRepository") private readonly supplierRepository: ISupplierRepository) {
    }

    async findAll(): Promise<SupplierEntity[]> {
        return await this.supplierRepository.findAll();
    }

    async create(req: SupplierCreateRequest): Promise<boolean> {
        let supplier: SupplierEntity = new SupplierEntity();
        supplier.name = req.name;
        supplier.address = req.address;
        supplier.email = req.email;
        supplier.phone = req.phone;

        return await this.supplierRepository.create(supplier);
    }

    async deleted(id: number): Promise<boolean> {
        return await this.supplierRepository.delete(id);
    }
}
