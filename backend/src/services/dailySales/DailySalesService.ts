import {inject, injectable} from "tsyringe";
import {IDailySalesService} from "./IDailySalesService";
import {IDailySalesRepository} from "../../repository/dailySales/IDailySalesRepository";
import {DailySalesEntity} from "../../entities/DailySalesEntity";
import {DailySalesCreateRequest} from "../../models/dailySales/DailySalesCreateRequest";

@injectable()
export class DailySalesService implements IDailySalesService {
    constructor(@inject("IDailySalesRepository") private readonly dailySalesRepository: IDailySalesRepository) {
    }

    async findAll(): Promise<DailySalesEntity[]> {
        return await this.dailySalesRepository.findAll();
    }

    async create(req: DailySalesCreateRequest): Promise<boolean> {
        let dailySalesEntity: DailySalesEntity = new DailySalesEntity();
        dailySalesEntity.money = req.money;

        return await this.dailySalesRepository.create(dailySalesEntity);
    }
}
