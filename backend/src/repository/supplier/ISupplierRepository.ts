import {Supplier} from "../../entities/Supplier";

export interface ISupplierRepository {
    findAll(): Promise<Supplier[] | null>

    create(supplier: Supplier): Promise<boolean>
}