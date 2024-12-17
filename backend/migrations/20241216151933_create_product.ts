import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("Product", (table) => {
        table.increments("id").primary().comment("自動遞增的主鍵");

        table
            .bigInteger("supplierId")
            .unsigned()
            .notNullable()
            .comment("供應商外來鍵")
            .references("id")
            .inTable("Supplier")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

        table.string("name", 20).notNullable().comment("商品名稱");
        table.string("pricingUnit", 10).notNullable().comment("計價單位");
        table.integer("unitPrice").notNullable().comment("單價");
        table.integer("count").notNullable().comment("數量");
        table.string("note", 255).nullable().comment("備註");

        // 建立唯一索引
        table.unique(["supplierId", "name"], {
            indexName: "product_supplierId_name_uindex",
        });
    });

    // 加入表格註解
    await knex.raw(`ALTER TABLE Product COMMENT '供應商提供的商品';`);
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("Product");
}