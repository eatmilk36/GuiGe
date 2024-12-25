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
        return this.dailySalesTypeRepository.find();
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
}
