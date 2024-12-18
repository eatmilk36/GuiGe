import {inject, injectable} from "tsyringe";
import {IDailySalesService} from "./IDailySalesService";
import {IDailySalesRepository} from "../../repository/dailySales/IDailySalesRepository";
import {DailySalesEntity} from "../../entities/DailySalesEntity";
import {DailySalesCreateRequest} from "../../models/dailySales/DailySalesCreateRequest";
import {DashbordReportDTO} from "../../repository/dailySales/DashbordReportDTO";

@injectable()
export class DailySalesService implements IDailySalesService {
    constructor(@inject("IDailySalesRepository") private readonly dailySalesRepository: IDailySalesRepository) {
    }

    async dashboard(): Promise<DashbordReportDTO[]> {
        return await this.dailySalesRepository.dashboard();
    }

    async findAll(): Promise<DailySalesEntity[]> {
        return await this.dailySalesRepository.findAll();
    }

    async create(req: DailySalesCreateRequest): Promise<boolean> {
        let dailySalesEntity: DailySalesEntity = new DailySalesEntity();
        dailySalesEntity.saleType = req.saleType;
        dailySalesEntity.money = req.money;

        return await this.dailySalesRepository.create(dailySalesEntity);
    }
}
