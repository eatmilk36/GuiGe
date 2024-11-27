import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/UserRoutes';
import 'reflect-metadata';
import {AppDataSource} from './mySQL/Db';

const app = express();

async function startServer() {
    try {
        console.log('SECRET_KEY:', process.env.SECRET_KEY); // 測試是否成功載入
        // 初始化資料庫
        await AppDataSource.initialize();
        console.log('Database connected successfully');

        // 中間件
        app.use(cors());
        app.use(bodyParser.json());

        // 路由
        app.use('/api', authRoutes);

        const PORT = process.env.SERVER_PORT ?? 3333;
        app.listen(PORT, () => {
            console.log(`Backend running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error during Data Source initialization:', error);
        process.exit(1); // 初始化失敗，終止應用
    }
}

startServer().then(_ => {
    console.log('startServer');
});