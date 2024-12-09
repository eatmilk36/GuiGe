import {inject, injectable} from "tsyringe";
import {ISupplierService} from "./ISupplierService";
import {ISupplierRepository} from "../../repository/supplier/ISupplierRepository";
import {Supplier} from "../../entities/Supplier";

@injectable()
export class SupplierService implements ISupplierService {
    constructor(@inject("ISupplierRepository") private readonly supplierRepository: ISupplierRepository) {
    }

    async findAll(): Promise<Supplier[]> {
        return await this.supplierRepository.findAll();
    }
}
