// src/data-source.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'GuiGeDb',
    synchronize: true, // 僅用於開發環境，生產環境建議使用 migration
    logging: false,
    entities: ["src/entities/**/*.ts"],
});
