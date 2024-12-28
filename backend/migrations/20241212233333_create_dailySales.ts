import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("DailySales", (table: Knex.CreateTableBuilder): void => {
        table.bigIncrements("id").primary(); // 自動遞增主鍵
        table.tinyint("salesType").notNullable().comment("1.收入2.支出"); // 收入或支出類型
        table.decimal("money", 8, 2).notNullable().comment("營業額"); // 營業額

        // 添加 dailySalesTypeId 欄位並設置外鍵約束
        table.bigInteger("dailySalesTypeId").unsigned().notNullable().comment("外鍵: DailySalesType");
        table
            .foreign("dailySalesTypeId")
            .references("id")
            .inTable("DailySalesType")
            .onDelete("CASCADE") // 刪除 DailySalesType 時刪除對應的 DailySales
            .onUpdate("CASCADE"); // 更新 DailySalesType 主鍵時同步更新

        table
            .timestamp("createdAt", { useTz: false })
            .defaultTo(knex.fn.now())
            .notNullable()
            .comment("自動記錄創建時間"); // 自動記錄創建時間
        table
            .timestamp("updatedAt", { useTz: false })
            .defaultTo(knex.fn.now())
            .notNullable()
            .comment("自動記錄更新時間"); // 自動記錄更新時間
        table
            .dateTime("deletedAt", { useTz: false })
            .nullable()
            .comment("可為空的刪除時間"); // 可為空的刪除時間
    }).then(() => {
        // 設定字元集和排序規則
        return knex.raw('ALTER TABLE GuiGeDb.DailySales CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    });

    // 修改資料表，新增 stall 欄位
    await knex.schema.alterTable("DailySales", (table: Knex.AlterTableBuilder): void => {
        table.integer("stall").notNullable().comment("攤位1.雜貨2.水果攤").after("dailySalesTypeId");
    });
}

export async function down(knex: Knex): Promise<void> {
    // 移除 stall 欄位
    await knex.schema.alterTable("DailySales", (table: Knex.AlterTableBuilder): void => {
        table.dropColumn("stall");
    });

    // 刪除資料表
    await knex.schema.dropTableIfExists("DailySales");
}