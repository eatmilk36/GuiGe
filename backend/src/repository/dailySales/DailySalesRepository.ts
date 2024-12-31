import {DailySalesEntity} from "../../entities/DailySalesEntity";
import {IDailySalesRepository} from "./IDailySalesRepository";
import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";
import {DashbordReportDTO} from "./DashbordReportDTO";
import {DailySalesListDTO} from "./DailySalesListDTO";

@injectable()
export class DailySalesRepository implements IDailySalesRepository {
    private readonly dailySalesRepository: Repository<DailySalesEntity>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.dailySalesRepository = this.dataSource.getRepository(DailySalesEntity);
    }

    async dashboard(): Promise<DashbordReportDTO[] | null> {
        try {
            const query = `
                SELECT SUM(CASE WHEN salesType = 1 THEN money ELSE 0 END) -
                       SUM(CASE WHEN salesType = 2 THEN money ELSE 0 END) -
                       (SELECT COALESCE(SUM(sw.pay), 0)
                        FROM GuiGeDb.StaffWork AS sw
                                 LEFT JOIN GuiGeDb.Staff AS s ON sw.staffId = s.id
                        WHERE
                        DATE(sw.createdAt) = CURDATE() AND sw.deletedAt IS NULL AND s.deletedAt IS NULL) AS totalSales
                     , 'daily' AS type
                FROM DailySales
                WHERE DATE (createdAt) = CURDATE() -- 當天
                GROUP BY DATE (createdAt), type

                UNION ALL

                SELECT SUM(CASE WHEN salesType = 1 THEN money ELSE 0 END) -
                       SUM(CASE WHEN salesType = 2 THEN money ELSE 0 END) -
                       (SELECT COALESCE(SUM(sw.pay), 0)
                        FROM GuiGeDb.StaffWork AS sw
                                 LEFT JOIN GuiGeDb.Staff AS s ON sw.staffId = s.id
                        WHERE DATE_FORMAT(sw.createdAt, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
                          AND sw.deletedAt IS NULL
                          AND s.deletedAt IS NULL) AS totalSales,
                       'monthly'                   AS type
                FROM DailySales
                WHERE DATE_FORMAT(createdAt, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') -- 當月
                GROUP BY DATE_FORMAT(createdAt, '%Y-%m'), type

                UNION ALL

                SELECT SUM(CASE WHEN salesType = 1 THEN money ELSE 0 END) -
                       SUM(CASE WHEN salesType = 2 THEN money ELSE 0 END) -
                       (SELECT COALESCE(SUM(sw.pay), 0)
                        FROM GuiGeDb.StaffWork AS sw
                                 LEFT JOIN GuiGeDb.Staff AS s ON sw.staffId = s.id
                        WHERE QUARTER(sw.createdAt) = QUARTER(CURDATE())
                                  AND YEAR (sw.createdAt) = YEAR(CURDATE())
          AND sw.deletedAt IS NULL
          AND s.deletedAt IS NULL) AS totalSales,
       'quarterly'                 AS type
                FROM DailySales
                WHERE QUARTER(createdAt) = QUARTER(CURDATE()) -- 當前季度
                  AND YEAR (createdAt) = YEAR (CURDATE())     -- 當前年份
                GROUP BY YEAR (createdAt), QUARTER(createdAt), type

                UNION ALL

                SELECT SUM(CASE WHEN salesType = 1 THEN money ELSE 0 END) -
                       SUM(CASE WHEN salesType = 2 THEN money ELSE 0 END) -
                       (SELECT COALESCE(SUM(sw.pay), 0)
                        FROM GuiGeDb.StaffWork AS sw
                                 LEFT JOIN GuiGeDb.Staff AS s ON sw.staffId = s.id
                        WHERE YEAR (sw.createdAt) = YEAR(CURDATE())
          AND sw.deletedAt IS NULL
          AND s.deletedAt IS NULL) AS totalSales,
       'yearly'                    AS type
                FROM DailySales
                WHERE YEAR (createdAt) = YEAR (CURDATE()) -- 當前年
                GROUP BY YEAR (createdAt), type;
            `;

            const result = await this.dailySalesRepository.query(query);

            // 將結果轉換為 DTO 格式
            return result.map((row: any) => ({
                date: row.date,
                totalSales: parseFloat(row.totalSales),
                type: row.type as "daily" | "monthly" | "quarterly" | "yearly",
            }));
        } catch (error) {
            console.error("生成儀表板時發生錯誤:", error);
            return null;
        }
    }

    async findAll(): Promise<DailySalesListDTO[] | null> {
        let query = "SELECT ds.*,dst.name" +
            "    FROM DailySales as ds left join DailySalesType dst on dst.id = ds.dailySalesTypeId"
            + " WHERE ds.deletedAt IS NULL AND dst.deletedAt IS NULL";
        const result = await this.dailySalesRepository.query(query);

        // 將結果轉換為 DTO 格式
        return result.map((row: DailySalesListDTO) => ({
            id: row.id,
            salesType: row.salesType,
            money: row.money,
            name: row.name,
            createdAt: row.createdAt,
        }));
    }

    async create(dailySales: DailySalesEntity): Promise<boolean> {
        try {
            const newDailySales = this.dailySalesRepository.create(dailySales);
            await this.dailySalesRepository.save(newDailySales);
            return true; // 儲存成功時回傳 true
        } catch (error) {
            console.error('儲存每日銷售數據時發生錯誤:', error); // 可以記錄錯誤資訊
            return false; // 發生錯誤時回傳 false
        }
    }

    async delete(id: number): Promise<boolean> {
        const dailySalesEntity = await this.dailySalesRepository.findOneBy({id});
        if (dailySalesEntity) {
            // await this.dailySalesRepository.remove(dailySalesEntity);
            dailySalesEntity.deletedAt = new Date();
            await this.dailySalesRepository.save(dailySalesEntity);
            return true;
        } else {
            // throw new Error(`ID 為 ${id} 的營業額未找到`);
            return false;
        }
    }
}