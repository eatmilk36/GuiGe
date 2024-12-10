import {Supplier} from "../../entities/Supplier";
import {SupplierCreateRequest} from "../../models/supplier/SupplierCreateRequest";

export interface ISupplierService {
    findAll(): Promise<Supplier[]>;

    create(req: SupplierCreateRequest): Promise<boolean>
}
