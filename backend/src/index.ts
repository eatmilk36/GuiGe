import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {UserRepository} from "./repository/UserRepository";
import authRoutes from './routes/AuthRoutes';
import 'reflect-metadata';

const app = express();

// 初始化 UserRepository 和 UserService
const userRepository = new UserRepository();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
