import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from "typeorm";
import {DailySalesTypeEntity} from "./DailySalesTypeEntity";

@Entity({ name: "DailySales" }) // 指定資料表名稱為 DailySales
export class DailySalesEntity {
    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
    id!: number; // 自動遞增主鍵

    @Column({ type: "tinyint", nullable: false, comment: "1.收入2.支出" })
    saleType!: number; // '1.收入2.支出'

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false, comment: "營業額" })
    money!: number; // 營業額

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date; // 建立時間

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date; // 更新時間

    @DeleteDateColumn({ type: "datetime", nullable: true })
    deletedAt!: Date | null; // 刪除時間，可為空

    @OneToMany(() => DailySalesTypeEntity, (dailySalesType) => dailySalesType.dailySales, { cascade: true })
    dailySalesTypes!: DailySalesTypeEntity[];
}