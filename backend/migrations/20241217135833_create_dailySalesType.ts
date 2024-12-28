import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("DailySalesType", (table: Knex.CreateTableBuilder) => {
        table.bigIncrements("id").primary(); // 自動遞增的主鍵
        table.string("name", 20).notNullable().comment("類型名稱"); // 類型名稱
        table.boolean("isActive").defaultTo(true).notNullable().comment("是否啟用"); // 是否啟用
        table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable(); // 自動記錄創建時間
        table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable(); // 自動記錄更新時間
        table.timestamp("deletedAt").nullable(); // 刪除時間
    }).then(() => {
        // 設定字元集和排序規則
        return knex.raw('ALTER TABLE GuiGeDb.DailySalesType CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("DailySalesType"); // 回滾刪除表
}