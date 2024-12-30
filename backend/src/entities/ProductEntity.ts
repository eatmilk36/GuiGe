import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
} from "typeorm";
import { SupplierEntity } from "./SupplierEntity";

@Entity({ name: "Product" }) // 指定資料表名稱
@Index("product_supplierId_name_uindex", ["supplierId", "name"], { unique: true }) // 唯一索引
export class ProductEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number; // 自動遞增主鍵

  @Column({ type: "bigint", unsigned: true, nullable: false, comment: "供應商外來鍵" })
  supplierId!: number;

  @Column({ type: "varchar", length: 20, nullable: false, comment: "商品名稱" })
  name!: string;

  @Column({ type: "varchar", length: 10, nullable: false, comment: "計價單位" })
  pricingUnit!: string;

  @Column({ type: "int", nullable: false, comment: "單價" })
  unitPrice!: number;

  @Column({ type: "int", nullable: false, comment: "數量" })
  count!: number;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "備註" })
  note?: string;

  @CreateDateColumn()
  createdAt!: Date; // 自動紀錄建立時間

  @UpdateDateColumn()
  updatedAt!: Date; // 自動紀錄更新時間

  @DeleteDateColumn()
  deletedAt?: Date; // 刪除時間

  // 關聯至 Supplier 表格
  @ManyToOne(() => SupplierEntity, (supplier) => supplier.products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "supplierId" })
  supplier!: SupplierEntity;
}
