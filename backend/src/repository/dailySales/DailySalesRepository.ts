import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";
import {IDailySalesRepository} from "./IDailySalesRepository";
import {DailySalesEntity} from "../../entities/DailySalesEntity";

@injectable()
export class DailySalesRepository implements IDailySalesRepository {
    private readonly dailySalesRepository: Repository<DailySalesEntity>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.dailySalesRepository = this.dataSource.getRepository(DailySalesEntity);
    }

    async findAll(): Promise<DailySalesEntity[] | null> {
        return this.dailySalesRepository.find();
    }

    async create(dailySales: DailySalesEntity): Promise<boolean> {
        try {
            const newDailySales = this.dailySalesRepository.create(dailySales);
            await this.dailySalesRepository.save(newDailySales);
            return true; // 儲存成功時回傳 true
        } catch (error) {
            console.error('Error saving dailySales:', error); // 可以記錄錯誤資訊
            return false; // 發生錯誤時回傳 false
        }
    }
}