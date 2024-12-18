import {DailySalesEntity} from "../../entities/DailySalesEntity";
import {DailySalesCreateRequest} from "../../models/dailySales/DailySalesCreateRequest";
import {DashbordReportDTO} from "../../repository/dailySales/DashbordReportDTO";

export interface IDailySalesService {
    dashboard(): Promise<DashbordReportDTO[] | null>;

    findAll(): Promise<DailySalesEntity[]>;

    create(req: DailySalesCreateRequest): Promise<boolean>
}
