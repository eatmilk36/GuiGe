import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: "Staff" })
export class StaffEntity {
    @PrimaryGeneratedColumn()
    id!: number; // 自動遞增主鍵

    @Column({ nullable: true, length: 20 })
    name?: string; // 員工名稱

    @Column({ nullable: true, length: 10 })
    phone?: string; // 電話號碼

    @Column({ length: 500 })
    note!: string; // 備註

    @CreateDateColumn()
    createdAt!: Date; // 自動紀錄建立時間

    @UpdateDateColumn()
    updatedAt!: Date; // 自動紀錄更新時間

    @DeleteDateColumn()
    deletedAt?: Date; // 刪除時間
}
