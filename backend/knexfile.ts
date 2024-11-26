import type { Knex } from "knex";

const config: Knex.Config = {
  client: "mysql2", // 使用 MySQL 驅動程式
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "GuiGeDb",
  },
  migrations: {
    directory: "./migrations", // 遷移檔案存放目錄
    extension: "ts", // 遷移檔案的擴展名
  },
  seeds: {
    directory: "./seeds", // 種子檔案存放目錄
  },
};

module.exports = config;
