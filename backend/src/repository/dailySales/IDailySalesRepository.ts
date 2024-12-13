import {DailySalesEntity} from "../../entities/DailySalesEntity";
import {SalesReportDTO} from "./SalesReportDTO";

export interface IDailySalesRepository {
    dashboard(): Promise<SalesReportDTO[] | null>;

    findAll(): Promise<DailySalesEntity[] | null>

    create(DailySales: DailySalesEntity): Promise<boolean>
}