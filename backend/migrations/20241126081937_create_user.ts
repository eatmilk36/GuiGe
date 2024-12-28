import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("User", (table) => {
        table.increments("id").primary(); // 自動遞增的主鍵
        table.string("username", 255).notNullable().unique(); // 帳號
        table.string("password", 255).notNullable(); // 密碼
        table.string("email", 255).notNullable().unique(); // 唯一的 Email
        table.boolean("isActive").notNullable().defaultTo(false); // 是否啟用
        table.timestamp("createdAt").defaultTo(knex.fn.now()); // 自動記錄建立時間
        table.timestamp("updatedAt").defaultTo(knex.fn.now()); // 自動記錄更新時間
        table.timestamp("deletedAt").nullable(); // 刪除時間
    }).then(() => {
        // 設定字元集和排序規則
        return knex.raw('ALTER TABLE GuiGeDb.User CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("User"); // 回滾刪除表
}
