import {DailySalesTypeEntity} from "../../entities/DailySalesTypeEntity";

export interface IDailySalesTypeRepository {
    findAll(): Promise<DailySalesTypeEntity[] | null>

    create(DailySales: DailySalesTypeEntity): Promise<boolean>

    delete(id: number): Promise<boolean>
}