import {DataSource, QueryRunner} from "typeorm";
import {inject, injectable} from "tsyringe";
import {IReportRepository} from "./IReportRepository";

@injectable()
export class ReportRepository implements IReportRepository {
    private readonly queryRunner: QueryRunner;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.queryRunner = this.dataSource.createQueryRunner();
    }

    async daily(): Promise<any[]> {
        const query = `
            WITH staffPay AS (SELECT -SUM(sw.pay) AS totalSales,
                                     '員工薪水'  AS name,
                                     0           AS id,
                                     2           AS salesType
                              FROM GuiGeDb.StaffWork AS sw
                                       LEFT JOIN
                                   GuiGeDb.Staff AS s
                                   ON
                                       sw.staffId = s.id
                              WHERE DATE(sw.createdAt) = CURDATE()
                                AND sw.deletedAt IS NULL
                                AND s.deletedAt IS NULL
                              GROUP BY s.id),

                 dailyTurnover AS (SELECT SUM(IF(ds.salesType = 1, ds.money, 0)) -
                                          SUM(IF(ds.salesType = 2, ds.money, 0)) AS totalSales,
                                          dst.name,
                                          dst.id,
                                          ds.salesType
                                   FROM GuiGeDb.DailySales AS ds
                                            LEFT JOIN
                                        GuiGeDb.DailySalesType AS dst
                                        ON
                                            ds.dailySalesTypeId = dst.id
                                   WHERE DATE(ds.createdAt) = CURDATE()
                                     AND ds.deletedAt IS NULL
                                     AND dst.deletedAt IS NULL
                                   GROUP BY dst.id, dst.name, ds.salesType)

            SELECT *
            FROM dailyTurnover

            UNION ALL

            SELECT *
            FROM staffPay;
        `;
        return await this.queryRunner.query(query); // 返回報表的查詢結果
    }
}
