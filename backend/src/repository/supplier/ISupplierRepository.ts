import {SupplierEntity} from "../../entities/SupplierEntity";

export interface ISupplierRepository {
    findAll(): Promise<SupplierEntity[] | null>

    create(supplier: SupplierEntity): Promise<boolean>
}