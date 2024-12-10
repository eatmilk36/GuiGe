import {inject, injectable} from "tsyringe";
import {ISupplierService} from "./ISupplierService";
import {ISupplierRepository} from "../../repository/supplier/ISupplierRepository";
import {Supplier} from "../../entities/Supplier";
import {SupplierCreateRequest} from "../../models/supplier/SupplierCreateRequest";

@injectable()
export class SupplierService implements ISupplierService {
    constructor(@inject("ISupplierRepository") private readonly supplierRepository: ISupplierRepository) {
    }

    async findAll(): Promise<Supplier[]> {
        return await this.supplierRepository.findAll();
    }

    async create(req: SupplierCreateRequest): Promise<boolean> {
        let supplier: Supplier = new Supplier();
        supplier.name = req.name;
        supplier.address = req.address;
        supplier.email = req.email;
        supplier.phone = req.phone;

        return await this.supplierRepository.create(supplier);
    }
}
