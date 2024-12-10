import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("Supplier", (table: Knex.CreateTableBuilder) => {
        table.bigIncrements("id").primary(); // 自動遞增主鍵
        table.string("name", 20).notNullable().unique(); // 供應商名稱
        table.string("address", 255).notNullable(); // 地址
        table.string("phone", 10).notNullable(); // 電話
        table.string("email", 255).notNullable(); // 郵件
        table.timestamp("createdAt", { useTz: false }).defaultTo(knex.fn.now()).notNullable(); // 自動記錄創建時間
        table.timestamp("updatedAt", { useTz: false }).defaultTo(knex.fn.now()).notNullable(); // 自動記錄更新時間
        table.timestamp("deletedAt", { useTz: false }).nullable(); // 可為空的刪除時間
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("supplier"); // 刪除資料表
}