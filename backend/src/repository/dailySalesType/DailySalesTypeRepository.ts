import {DailySalesTypeEntity} from "../../entities/DailySalesTypeEntity";
import {IDailySalesTypeRepository} from "./IDailySalesTypeRepository";
import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";

@injectable()
export class DailySalesTypeRepository implements IDailySalesTypeRepository {
    private readonly dailySalesTypeRepository: Repository<DailySalesTypeEntity>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.dailySalesTypeRepository = this.dataSource.getRepository(DailySalesTypeEntity);
    }

    async findAll(): Promise<DailySalesTypeEntity[] | null> {
        return this.dailySalesTypeRepository.find({
            where: {deletedAt: null}
        });
    }

    async create(dailySalesType: DailySalesTypeEntity): Promise<boolean> {
        try {
            const newDailySalesType = this.dailySalesTypeRepository.create({
                name: dailySalesType.name,
                isActive: true
            });
            await this.dailySalesTypeRepository.save(newDailySalesType);
            return true; // 儲存成功時回傳 true
        } catch (error) {
            console.error('日營業額項目儲存錯誤', error); // 可以記錄錯誤資訊
            return false; // 發生錯誤時回傳 false
        }
    }

    async delete(id: number): Promise<boolean> {
        const dailySalesTypeEntity = await this.dailySalesTypeRepository.findOneBy({id});
        if (dailySalesTypeEntity) {
            // await this.dailySalesTypeRepository.remove(dailySalesTypeEntity);
            dailySalesTypeEntity.deletedAt = new Date();
            await this.dailySalesTypeRepository.save(dailySalesTypeEntity);
            return true;
        } else {
            // throw new Error(`ID 為 ${id} 的營業額類型未找到`);
            return false;
        }
    }
}
