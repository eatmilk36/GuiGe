import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from "typeorm";

@Entity({ name: "Supplier" }) // 指定資料表名稱為 supplier
export class SupplierEntity {
    @PrimaryGeneratedColumn()
    id!: number; // 自動遞增主鍵

    @Column({ length: 20 })
    name!: string; // 供應商名稱

    @Column({ length: 255 })
    address!: string; // 地址

    @Column({ length: 10 })
    phone!: string; // 電話

    @Column({ length: 255 })
    email!: string; // 電子郵件

    @CreateDateColumn()
    createdAt!: Date; // 建立時間

    @UpdateDateColumn()
    updatedAt!: Date; // 更新時間

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null; // 刪除時間，可為空
}
