import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("Staff", (table) => {
        table.bigIncrements("id").primary(); // 自動遞增的主鍵
        table.string("name", 20).nullable(); // 員工名稱
        table.string("phone", 10).nullable(); // 電話號碼
        table.string("note", 500).notNullable(); // 備註
        table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable(); // 自動紀錄建立時間
        table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable(); // 自動紀錄更新時間
        table.timestamp("deletedAt").nullable(); // 刪除時間
        table.comment("員工"); // 表格註解
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("Staff"); // 回滾刪除表格
}
