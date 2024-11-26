// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from '../entities/User';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'testdb',
    synchronize: true, // 僅用於開發環境，生產環境建議使用 migration
    logging: false,
    entities: [User],
});
