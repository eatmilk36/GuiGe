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

    async create(supplier: Supplier): Promise<boolean> {
        try {
            const newSupplier = this.supplierRepository.create(supplier);
            await this.supplierRepository.save(newSupplier);
            return true; // 儲存成功時回傳 true
        } catch (error) {
            console.error('Error saving supplier:', error); // 可以記錄錯誤資訊
            return false; // 發生錯誤時回傳 false
        }
    }
}