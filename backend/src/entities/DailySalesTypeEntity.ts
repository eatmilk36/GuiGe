import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne
} from 'typeorm';
import {DailySalesEntity} from "./DailySalesEntity";

@Entity({ name: "DailySalesType" })
export class DailySalesTypeEntity {
    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
    id!: number;

    @Column({ type: "varchar", length: 20, comment: "類型名稱" })
    name!: string;

    @Column({ type: "tinyint", width: 1, default: 1, comment: "是否啟用" })
    isActive!: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deletedAt!: Date | null;

    @OneToOne(() => DailySalesEntity, (dailySales) => dailySales.id, { nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    dailySales!: DailySalesEntity;
}