import {Supplier} from "../../entities/Supplier";

export interface ISupplierRepository {
    findAll(): Promise<Supplier[] | null>
}