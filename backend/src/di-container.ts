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
import {ISupplierService} from "./services/supplier/ISupplierService";
import {SupplierService} from "./services/supplier/SupplierService";
import {SupplierController} from "./controllers/SupplierController";
import {ISupplierRepository} from "./repository/supplier/ISupplierRepository";
import {SupplierRepository} from "./repository/supplier/SupplierRepository";
import {DailySalesController} from "./controllers/DailySalesController";
import {IDailySalesRepository} from "./repository/dailySales/IDailySalesRepository";
import {DailySalesRepository} from "./repository/dailySales/DailySalesRepository";
import {IDailySalesService} from "./services/dailySales/IDailySalesService";
import {DailySalesService} from "./services/dailySales/DailySalesService";

container.register(DataSource, { useValue: AppDataSource });

// Repository
container.register<IUserRepository>("IUserRepository", { useClass: UserRepository });
container.register<ISupplierRepository>("ISupplierRepository", { useClass: SupplierRepository });
container.register<IDailySalesRepository>("IDailySalesRepository", { useClass: DailySalesRepository });

// Service
container.register<IAuthService>("IAuthService", { useClass: AuthService });
container.register<IUserService>("IUserService", { useClass: UserService });
container.register<ISupplierService>("ISupplierService", { useClass: SupplierService });
container.register<IDailySalesService>("IDailySalesService", { useClass: DailySalesService });

// Controller
container.register(UserController, { useClass: UserController });
container.register(AuthController, { useClass: AuthController });
container.register(SupplierController, { useClass: SupplierController });
container.register(DailySalesController, { useClass: DailySalesController });

export { container };
