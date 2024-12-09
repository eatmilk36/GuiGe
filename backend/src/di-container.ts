import 'reflect-metadata'; // 必須在容器初始化之前導入
import { container } from 'tsyringe';
import { UserController } from './controllers/UserController';
import { UserService } from './services/user/UserService';
import {UserRepository} from './repository/user/UserRepository';
import {DataSource} from "typeorm";
import {AppDataSource} from "./mySQL/Db";
import {IUserRepository} from "./repository/user/IUserRepository";
import {AuthController} from "./controllers/AuthController";
import {AuthService} from "./services/auth/AuthService";
import {IAuthService} from "./services/auth/IAuthService";
import {IUserService} from "./services/user/IUserService";

container.register(DataSource, { useValue: AppDataSource });

// Repository
container.register<IUserRepository>("IUserRepository", { useClass: UserRepository });

// Service
// container.register(UserService, { useClass: UserService });
// container.register(AuthService, { useClass: AuthService });
container.register<IAuthService>("IAuthService", { useClass: AuthService });
container.register<IUserService>("IUserService", { useClass: UserService });

// Controller
container.register(UserController, { useClass: UserController });
container.register(AuthController, { useClass: AuthController });

export { container };
