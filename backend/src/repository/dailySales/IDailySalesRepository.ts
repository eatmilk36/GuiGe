import {DailySalesEntity} from "../../entities/DailySalesEntity";
import {DashbordReportDTO} from "./DashbordReportDTO";
import {DailySalesListDTO} from "./DailySalesListDTO";

export interface IDailySalesRepository {
    dashboard(): Promise<DashbordReportDTO[] | null>;

    findAll(): Promise<DailySalesListDTO[] | null>

    create(DailySales: DailySalesEntity): Promise<boolean>
}