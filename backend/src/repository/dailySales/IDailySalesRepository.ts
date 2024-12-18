import {DailySalesEntity} from "../../entities/DailySalesEntity";
import {DashbordReportDTO} from "./DashbordReportDTO";

export interface IDailySalesRepository {
    dashboard(): Promise<DashbordReportDTO[] | null>;

    findAll(): Promise<DailySalesEntity[] | null>

    create(DailySales: DailySalesEntity): Promise<boolean>
}