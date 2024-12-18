import {DailySalesTypeEntity} from "../../entities/DailySalesTypeEntity";
import {IDailySalesTypeRepository} from "./IDailySalesTypeRepository";
import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";
import {DailySalesEntity} from "../../entities/DailySalesEntity";

@injectable()
export class DailySalesTypeRepository implements IDailySalesTypeRepository {
    private readonly dailySalesTypeRepository: Repository<DailySalesTypeEntity>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.dailySalesTypeRepository = this.dataSource.getRepository(DailySalesTypeEntity);
    }

    async findAll(): Promise<DailySalesTypeEntity[] | null> {
        return this.dailySalesTypeRepository.find();
    }

    async create(dailySalesType: DailySalesTypeEntity): Promise<boolean> {
        try {

            const dailySalesEntityRepository = this.dataSource.getRepository(DailySalesEntity);
            const dailySalesEntity = await dailySalesEntityRepository.findOneBy({id: dailySalesType.dailySalesId});
            if (!dailySalesEntity) {
                throw new Error("dailySalesType not found");
            }

            const newDailySalesType = this.dailySalesTypeRepository.create({
                name: dailySalesType.name,
                dailySales: dailySalesEntity,
                isActive: true
            });
            await this.dailySalesTypeRepository.save(newDailySalesType);
            return true; // 儲存成功時回傳 true
        } catch (error) {
            console.error('Error saving dailySalesType:', error); // 可以記錄錯誤資訊
            return false; // 發生錯誤時回傳 false
        }
    }
}
