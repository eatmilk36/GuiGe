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
import {IProductRepository} from "./repository/product/IProductRepository";
import {IProductService} from "./services/product/IProductService";
import {ProductService} from "./services/product/ProductService";
import {ProductController} from "./controllers/ProductController";
import {ProductRepository} from "./repository/product/ProductRepository";
import {IDailySalesTypeRepository} from "./repository/dailySalesType/IDailySalesTypeRepository";
import {IDailySalesTypeService} from "./services/dailySalesType/IDailySalesTypeService";
import {DailySalesTypeService} from "./services/dailySalesType/DailySalesTypeService";
import {DailySalesTypeController} from "./controllers/DailySalesTypeController";
import {DailySalesTypeRepository} from "./repository/dailySalesType/DailySalesTypeRepository";
import {IStaffRepository} from "./repository/staff/IStaffRepository";
import {StaffRepository} from "./repository/staff/StaffRepository";
import {IStaffService} from "./services/staff/IStaffService";
import {StaffService} from "./services/staff/StaffService";
import {StaffController} from "./controllers/StaffController";

container.register(DataSource, { useValue: AppDataSource });

// Repository
container.register<IUserRepository>("IUserRepository", { useClass: UserRepository });
container.register<ISupplierRepository>("ISupplierRepository", { useClass: SupplierRepository });
container.register<IDailySalesRepository>("IDailySalesRepository", { useClass: DailySalesRepository });
container.register<IDailySalesTypeRepository>("IDailySalesTypeRepository", { useClass: DailySalesTypeRepository });
container.register<IProductRepository>("IProductRepository", { useClass: ProductRepository });
container.register<IStaffRepository>("IStaffRepository", { useClass: StaffRepository });

// Service
container.register<IAuthService>("IAuthService", { useClass: AuthService });
container.register<IUserService>("IUserService", { useClass: UserService });
container.register<ISupplierService>("ISupplierService", { useClass: SupplierService });
container.register<IDailySalesService>("IDailySalesService", { useClass: DailySalesService });
container.register<IDailySalesTypeService>("IDailySalesTypeService", { useClass: DailySalesTypeService });
container.register<IProductService>("IProductService", { useClass: ProductService });
container.register<IStaffService>("IStaffService", { useClass: StaffService });

// Controller
container.register(UserController, { useClass: UserController });
container.register(AuthController, { useClass: AuthController });
container.register(SupplierController, { useClass: SupplierController });
container.register(DailySalesController, { useClass: DailySalesController });
container.register(DailySalesTypeController, { useClass: DailySalesTypeController });
container.register(ProductController, { useClass: ProductController });
container.register(StaffController, { useClass: StaffController });

export { container };
