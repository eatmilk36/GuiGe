import {DailySalesEntity} from "../../entities/DailySalesEntity";
import {DailySalesCreateRequest} from "../../models/dailySales/DailySalesCreateRequest";
import {SalesReportDTO} from "../../repository/dailySales/SalesReportDTO";

export interface IDailySalesService {
    dashboard(): Promise<SalesReportDTO[] | null>;

    findAll(): Promise<DailySalesEntity[]>;

    create(req: DailySalesCreateRequest): Promise<boolean>
}
