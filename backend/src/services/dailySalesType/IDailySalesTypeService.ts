import {DailySalesTypeEntity} from "../../entities/DailySalesTypeEntity";
import {DailySalesTypeCreateRequest} from "../../models/dailySalesType/DailySalesTypeCreateRequest";

export interface IDailySalesTypeService {
    findAll(): Promise<DailySalesTypeEntity[]>;

    create(req: DailySalesTypeCreateRequest): Promise<boolean>

    deleted(id: number): Promise<boolean>
}
