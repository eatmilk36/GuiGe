import {DailySalesEntity} from "../../entities/DailySalesEntity";
import {DailySalesCreateRequest} from "../../models/dailySales/DailySalesCreateRequest";

export interface IDailySalesService {
    findAll(): Promise<DailySalesEntity[]>;

    create(req: DailySalesCreateRequest): Promise<boolean>
}
