import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("StaffWork", (table) => {
        table.bigIncrements("id").primary(); // 自動遞增的主鍵
        table.bigInteger("staffId").unsigned().notNullable().references("id").inTable("Staff").onUpdate("CASCADE").onDelete("CASCADE"); // 外鍵指向 Staff 的 id，連鎖更新與刪除
        table.integer("workType").notNullable().comment("1.時薪2.日薪3.月薪"); // 工作類型
        table.integer("workCount").notNullable().comment("工作時數"); // 工作時數
        table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable(); // 自動紀錄建立時間
        table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable(); // 自動紀錄更新時間
        table.timestamp("deletedAt").nullable(); // 刪除時間
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("StaffWork"); // 回滾刪除表格
}
