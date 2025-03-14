import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";
import {ISupplierRepository} from "./ISupplierRepository";
import {SupplierEntity} from "../../entities/SupplierEntity";

@injectable()
export class SupplierRepository implements ISupplierRepository {
    private readonly supplierRepository: Repository<SupplierEntity>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.supplierRepository = this.dataSource.getRepository(SupplierEntity);
    }

    async findAll(): Promise<SupplierEntity[] | null> {
        return this.supplierRepository.find({
            where: {deletedAt: null}
        });
    }

    async create(supplier: SupplierEntity): Promise<boolean> {
        try {
            const newSupplier = this.supplierRepository.create(supplier);
            await this.supplierRepository.save(newSupplier);
            return true; // 儲存成功時回傳 true
        } catch (error) {
            console.error('儲存供應商時發生錯誤:', error); // 可以記錄錯誤資訊
            return false; // 發生錯誤時回傳 false
        }
    }

    async delete(id: number): Promise<boolean> {
        const supplierEntity = await this.supplierRepository.findOneBy({id});
        if (supplierEntity) {
            // await this.supplierRepository.remove(supplierEntity);
            supplierEntity.deletedAt = new Date();
            await this.supplierRepository.save(supplierEntity);
            return true;
        } else {
            // throw new Error(`ID 為 ${id} 的供應商未找到`);
            return false;
        }
    }
}