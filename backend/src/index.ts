import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/AuthRoutes';
import {AppDataSource} from './mySQL/Db';

const app = express();

async function startServer() {
    try {
        // 初始化資料庫
        await AppDataSource.initialize();

        // 中間件
        app.use(cors());
        app.use(bodyParser.json());

        // 路由
        app.use('/api/user', userRoutes);
        app.use('/api/auth', authRoutes);

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