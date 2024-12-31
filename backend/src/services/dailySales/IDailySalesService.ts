import {DailySalesCreateRequest} from "../../models/dailySales/DailySalesCreateRequest";
import {DashbordReportDTO} from "../../repository/dailySales/DashbordReportDTO";
import {DailySalesListDTO} from "../../repository/dailySales/DailySalesListDTO";

export interface IDailySalesService {
    dashboard(): Promise<DashbordReportDTO[] | null>;

    findAll(): Promise<DailySalesListDTO[]>;

    create(req: DailySalesCreateRequest): Promise<boolean>

    deleted(id: number): Promise<boolean>
}
