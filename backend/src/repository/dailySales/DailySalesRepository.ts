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
                SELECT
                    SUM(CASE WHEN salesType = 1 THEN money ELSE 0 END) - SUM(CASE WHEN salesType = 2 THEN money ELSE 0 END) AS totalSales,
                    'daily' AS type
                FROM DailySales
                WHERE
                    DATE(createdAt) = CURDATE() -- 當天
                GROUP BY
                    DATE(createdAt), type
-- Daily: 當天數據

                UNION ALL

                SELECT
                    SUM(CASE WHEN salesType = 1 THEN money ELSE 0 END) - SUM(CASE WHEN salesType = 2 THEN money ELSE 0 END) AS totalSales,
                    'monthly' AS type
                FROM DailySales
                WHERE
                    DATE_FORMAT(createdAt, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') -- 當月
                GROUP BY
                    DATE_FORMAT(createdAt, '%Y-%m'), type
-- Monthly: 當月數據

                UNION ALL

                SELECT
                    SUM(CASE WHEN salesType = 1 THEN money ELSE 0 END) - SUM(CASE WHEN salesType = 2 THEN money ELSE 0 END) AS totalSales,
                    'quarterly' AS type
                FROM DailySales
                WHERE
                    QUARTER(createdAt) = QUARTER(CURDATE()) -- 當前季度
                        AND YEAR(createdAt) = YEAR(CURDATE())  -- 當前年份
                GROUP BY
                    YEAR(createdAt), QUARTER(createdAt), type
-- Quarterly: 當前季度數據

                UNION ALL

                SELECT
                    SUM(CASE WHEN salesType = 1 THEN money ELSE 0 END) - SUM(CASE WHEN salesType = 2 THEN money ELSE 0 END) AS totalSales,
                    'yearly' AS type
                FROM DailySales
                WHERE
                    YEAR(createdAt) = YEAR(CURDATE()) -- 當前年
                GROUP BY
                    YEAR(createdAt), type;
            `;

            const result = await this.dailySalesRepository.query(query);

            // 將結果轉換為 DTO 格式
            return result.map((row: any) => ({
                date: row.date,
                totalSales: parseFloat(row.totalSales),
                type: row.type as "daily" | "monthly" | "quarterly" | "yearly",
            }));
        } catch (error) {
            console.error("Error generating dashboard:", error);
            return null;
        }
    }

    async findAll(): Promise<DailySalesListDTO[] | null> {
        let query = "SELECT ds.*,dst.name" +
            "    FROM DailySales as ds left join DailySalesType dst on dst.id = ds.dailySalesTypeId";
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
            console.error('Error saving dailySales:', error); // 可以記錄錯誤資訊
            return false; // 發生錯誤時回傳 false
        }
    }
}
