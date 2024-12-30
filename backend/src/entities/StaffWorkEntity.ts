import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import {StaffEntity} from './StaffEntity';

@Entity({name: "StaffWork"})
export class StaffWorkEntity {
    @PrimaryGeneratedColumn()
    id!: number; // 自動遞增主鍵

    @Column({ type: "bigint", unsigned: true, nullable: false, comment: "員工基本資料外鍵" })
    staffId!: number;

    @Column({type: "int", comment: "1.雜貨 2.水果"})
    stall!: number; // 1.雜貨 2.水果

    @Column({type: "int", comment: "1.時薪2.日薪3.月薪"})
    workType!: number; // 工作類型

    @Column({type: "int", comment: "工作時數"})
    workCount!: number; // 工作時數

    @Column({type: "int", comment: "薪水"})
    pay!: number; // 工作時數

    @CreateDateColumn()
    createdAt!: Date; // 自動紀錄建立時間

    @UpdateDateColumn()
    updatedAt!: Date; // 自動紀錄更新時間

    @DeleteDateColumn()
    deletedAt?: Date; // 刪除時間

    @ManyToOne(() => StaffEntity)
    @JoinColumn({name: "staffId"})
    staff!: StaffEntity; // 關聯到 Staff 的外鍵
}
