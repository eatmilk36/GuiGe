import {SupplierEntity} from "../../entities/SupplierEntity";
import {SupplierCreateRequest} from "../../models/supplier/SupplierCreateRequest";

export interface ISupplierService {
    findAll(): Promise<SupplierEntity[]>;

    create(req: SupplierCreateRequest): Promise<boolean>
}
