import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne, JoinColumn
} from "typeorm";
import {DailySalesTypeEntity} from "./DailySalesTypeEntity";

@Entity({ name: "DailySales" }) // 指定資料表名稱為 DailySales
export class DailySalesEntity {
    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
    id!: number; // 自動遞增主鍵

    @Column({ type: "bigint", unsigned: true, nullable: false, comment: "每日營業額類別外來鍵" })
    dailySalesTypeId!: number;

    @Column({ type: "tinyint", nullable: false, comment: "1.收入2.支出" })
    salesType!: number; // '1.收入2.支出'

    @Column({ type: "tinyint", nullable: false, comment: "'1.雜貨2.水果攤" })
    stall!: number; // '1.雜貨2.水果攤'

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false, comment: "營業額" })
    money!: number; // 營業額

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date; // 建立時間

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date; // 更新時間

    @DeleteDateColumn({ type: "datetime", nullable: true })
    deletedAt!: Date | null; // 刪除時間，可為空

    @OneToOne(() => DailySalesTypeEntity, (dailySalesType) => dailySalesType.dailySales, { cascade: true })
    @JoinColumn({ name: "dailySalesTypeId" })
    dailySalesTypes!: DailySalesTypeEntity;
}