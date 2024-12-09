import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";
import {ISupplierRepository} from "./ISupplierRepository";
import {Supplier} from "../../entities/Supplier";

@injectable()
export class SupplierRepository implements ISupplierRepository {
    private readonly supplierRepository: Repository<Supplier>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.supplierRepository = this.dataSource.getRepository(Supplier);
    }

    async findAll(): Promise<Supplier[] | null> {
        return this.supplierRepository.find();
    }
}