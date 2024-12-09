import {Supplier} from "../../entities/Supplier";

export interface ISupplierService {
    findAll(): Promise<Supplier[]>;
}
