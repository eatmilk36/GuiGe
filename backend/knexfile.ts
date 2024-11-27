import type { Knex } from "knex";

const config: Knex.Config = {
  client: "mysql2", // 使用 MySQL 驅動
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "GuiGeDb",
  },
  migrations: {
    directory: "./migrations", // 遷移檔案存放目錄
    extension: "ts",           // 遷移檔案的擴展名
  },
  seeds: {
    directory: "./seeds",      // 種子檔案存放目錄
  },
};

export default config;