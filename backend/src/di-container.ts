import 'reflect-metadata'; // 必須在容器初始化之前導入
import { container } from 'tsyringe';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import {IUserRepository, UserRepository} from './repository/UserRepository';
import {DataSource} from "typeorm";
import {AppDataSource} from "./mySQL/Db";

container.register(DataSource, { useValue: AppDataSource });

// 註冊 IUserRepository 與 UserRepository
container.register<IUserRepository>("IUserRepository", { useClass: UserRepository });

// 註冊 UserService
container.register(UserService, { useClass: UserService });

// 註冊 UserController
container.register(UserController, { useClass: UserController });

export { container };
