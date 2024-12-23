import {inject, injectable} from "tsyringe";
import {IDailySalesTypeService} from "./IDailySalesTypeService";
import {DailySalesTypeEntity} from "../../entities/DailySalesTypeEntity";
import {IDailySalesTypeRepository} from "../../repository/dailySalesType/IDailySalesTypeRepository";
import {DailySalesTypeCreateRequest} from "../../models/dailySalesType/DailySalesTypeCreateRequest";

@injectable()
export class DailySalesTypeService implements IDailySalesTypeService {
    constructor(@inject("IDailySalesTypeRepository") private readonly dailySalesTypeRepository: IDailySalesTypeRepository) {
    }

    async findAll(): Promise<DailySalesTypeEntity[]> {
        return await this.dailySalesTypeRepository.findAll();
    }

    async create(req: DailySalesTypeCreateRequest): Promise<boolean> {
        let dailySalesTypeEntity: DailySalesTypeEntity = new DailySalesTypeEntity();
        dailySalesTypeEntity.name = req.name;

        return await this.dailySalesTypeRepository.create(dailySalesTypeEntity);
    }
}