import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";
import { ProductEntity } from "./ProductEntity"; // 修正導入的實體名稱

@Entity({ name: "Supplier" }) // 指定資料表名稱
export class SupplierEntity {
    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
    id!: number; // 自動遞增主鍵，bigint 並設為 unsigned

    @Column({ type: "varchar", length: 20, nullable: false, comment: "供應商名稱" })
    name!: string;

    @Column({ type: "varchar", length: 255, nullable: false, comment: "地址" })
    address!: string;

    @Column({ type: "varchar", length: 10, nullable: false, comment: "電話" })
    phone!: string;

    @Column({ type: "varchar", length: 255, nullable: false, comment: "電子郵件" })
    email!: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", comment: "建立時間" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", comment: "更新時間" })
    updatedAt!: Date;

    @DeleteDateColumn({ type: "datetime", nullable: true, comment: "刪除時間" })
    deletedAt!: Date | null;

    @OneToMany(() => ProductEntity, (product) => product.supplier) // 修正實體名稱
    products!: ProductEntity[];
}