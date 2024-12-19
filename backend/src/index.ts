import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/AuthRoutes';
import {AppDataSource} from './mySQL/Db';
import supplierRoutes from "./routes/SupplierRoutes";
import dailySalesRoutes from "./routes/DailySalesRoutes";
import productRoutes from "./routes/ProductRoutes";
import dailySalesTypeRoutes from "./routes/DailySalesTypeRoutes";
import staffRoutes from "./routes/StaffRoutes";

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
        app.use('/api/supplier', supplierRoutes);
        app.use('/api/dailySales', dailySalesRoutes);
        app.use('/api/dailySalesType', dailySalesTypeRoutes);
        app.use('/api/product', productRoutes);
        app.use('/api/staff', staffRoutes);

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