import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from "typeorm";

@Entity({ name: "supplier" }) // 指定資料表名稱為 supplier
export class Supplier {
    @PrimaryGeneratedColumn()
    id!: number; // 自動遞增主鍵

    @Column({ length: 20 })
    name!: string; // 供應商名稱

    @Column({ length: 255 })
    address!: string; // 地址

    @Column({ length: 10 })
    phone!: string; // 電話

    @Column({ length: 255 })
    mail!: string; // 電子郵件

    @CreateDateColumn()
    createdTime!: Date; // 建立時間

    @UpdateDateColumn()
    updateTime!: Date; // 更新時間

    @DeleteDateColumn({ nullable: true })
    deletedTime!: Date | null; // 刪除時間，可為空
}
