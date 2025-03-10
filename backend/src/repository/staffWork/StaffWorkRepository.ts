import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";
import {IStaffWorkRepository} from "./IStaffWorkRepository";
import {StaffWorkEntity} from "../../entities/StaffWorkEntity";
import {StaffEntity} from "../../entities/StaffEntity";
import {StaffWorkListDTO} from "./StaffWorkListDTO";

@injectable()
export class StaffWorkRepository implements IStaffWorkRepository {
    private readonly staffWorkRepository: Repository<StaffWorkEntity>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.staffWorkRepository = this.dataSource.getRepository(StaffWorkEntity);
    }

    async findAll(): Promise<StaffWorkEntity[] | null> {
        let query = "SELECT sw.*,s.name " +
            "FROM StaffWork sw left join Staff s on s.id = sw.staffId"
            + " WHERE sw.deletedAt IS NULL AND s.deletedAt IS NULL";
        const result = await this.staffWorkRepository.query(query);
        return result.map((row: StaffWorkListDTO) => ({
            id: row.id,
            name: row.name,
            stall: row.stall,
            workType: row.workType,
            workCount: row.workCount,
            pay: row.pay,
            createdAt: row.createdAt,
        }));
    }

    async create(staffWork: StaffWorkEntity): Promise<boolean> {
        try {
            const staffEntityRepository = this.dataSource.getRepository(StaffEntity);
            const staffEntity = await staffEntityRepository.findOneBy({id: staffWork.staffId});
            if (!staffEntity) {
                throw new Error("找不到該員工");
            }

            const staffWorkEntity = this.staffWorkRepository.create({
                stall: staffWork.stall,
                workType: staffWork.workType,
                workCount: staffWork.workCount,
                pay: staffWork.pay,
                staff: staffEntity,
            });
            await this.staffWorkRepository.save(staffWorkEntity);
            return true; // 儲存成功時回傳 true
        } catch (error) {
            console.error('儲存員工工作時發生錯誤', error); // 可以記錄錯誤資訊
            return false; // 發生錯誤時回傳 false
        }
    }

    async delete(id: number): Promise<boolean> {
        const staffWorkEntity = await this.staffWorkRepository.findOneBy({id});
        if (staffWorkEntity) {
            // await this.staffWorkRepository.remove(staffWorkEntity);
            staffWorkEntity.deletedAt = new Date();
            await this.staffWorkRepository.save(staffWorkEntity);
            return true;
        } else {
            // throw new Error(`ID 為 ${id} 的員工工作未找到`);
            return false;
        }
    }
}