import {Knex} from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary(); // 自動遞增的主鍵
        table.string("username", 255).notNullable(); // 帳號
        table.string("password", 255).notNullable(); // 密碼
        table.string("email", 255).notNullable().unique(); // 唯一的 Email
        table.boolean("isActive").notNullable().defaultTo(false); // 是否啟用
        table.timestamp("createdAt").defaultTo(knex.fn.now()); // 自動記錄建立時間
        table.timestamp("updatedAt").defaultTo(knex.fn.now()); // 自動記錄更新時間
        table.timestamp("deletedAt").nullable() // 刪除時間
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users"); // 回滾刪除表
}