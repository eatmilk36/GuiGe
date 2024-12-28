import type {Knex} from "knex";

const config: Knex.Config = {
    client: "mysql2", // 使用 MySQL 驅動
    connection: {
        host: process.env.DB_HOST || "127.0.0.1",
        port: 3306,
        user: process.env.DB_USER || "jeter",
        password: process.env.DB_PASSWORD || "jeter",
        database: process.env.DB_NAME || "GuiGeDb",
    },
    migrations: {
        // directory: "./dist/src/migrations", // 遷移檔案存放目錄
        directory: "./migrations", // 遷移檔案存放目錄
        extension: process.env.NODE_ENV === 'production' ? "js" : "ts",           // 遷移檔案的擴展名
    },
    seeds: {
        // directory: "./dist/src/seeds",      // 種子檔案存放目錄
        directory: "./seeds",      // 種子檔案存放目錄
    },
};

export default config;