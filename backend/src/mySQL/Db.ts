import {DataSource} from "typeorm";
import * as process from "node:process";

console.log(process.env.DB_USER)

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: parseInt(process.env.DB_PORT ?? "3306"),
    username: process.env.DB_USER ?? "jeter",
    password: process.env.DB_PASSWORD ?? "jeter",
    database: process.env.DB_NAME ?? "GuiGeDb",
    synchronize: false, // 關閉自動同步，避免與 Knex 的 migration 衝突
    logging: true,
    entities: process.env.NODE_ENV === 'production'
        ? ['dist/src/entities/*.js'] // 適用於編譯後的環境
        : ['src/entities/*.ts'],  // 適用於開發環境
    migrations: process.env.NODE_ENV === 'production'
        ? ['dist/src/migrations/*.js']
        : ["src/migrations/**/*.ts"],
});