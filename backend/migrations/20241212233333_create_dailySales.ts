import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("DailySales", (table: Knex.CreateTableBuilder): void => {
        table.bigIncrements("id").primary(); // 自動遞增主鍵
        table.decimal("money").notNullable().comment("營業額"); // 營業額
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
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("DailySales"); // 刪除資料表
}
