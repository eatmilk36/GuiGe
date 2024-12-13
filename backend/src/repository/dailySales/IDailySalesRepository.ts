import {DailySalesEntity} from "../../entities/DailySalesEntity";

export interface IDailySalesRepository {
    findAll(): Promise<DailySalesEntity[] | null>

    create(DailySales: DailySalesEntity): Promise<boolean>
}