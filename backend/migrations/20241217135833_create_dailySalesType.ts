import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("DailySalesType", (table: Knex.CreateTableBuilder) => {
        table.bigIncrements("id").primary(); // 自動遞增的主鍵
        table.string("name", 20).notNullable().comment("類型名稱"); // 類型名稱
        table.boolean("isActive").defaultTo(true).notNullable().comment("是否啟用"); // 是否啟用
        table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable(); // 自動記錄創建時間
        table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable(); // 自動記錄更新時間
        table.timestamp("deletedAt").nullable(); // 刪除時間

        // 新增 dailySalesId 欄位，並設置為外鍵
        table.bigInteger("dailySalesId")
            .unsigned()
            .notNullable()
            .comment("參考 dailySales 表的 ID")
            .references("id")
            .inTable("DailySales")
            .onDelete("CASCADE") // 設置連鎖反應: 刪除時一併刪除
            .onUpdate("CASCADE"); // 設置更新時同步更新
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("DailySalesType"); // 回滾刪除表
}