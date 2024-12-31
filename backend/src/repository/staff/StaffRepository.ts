import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";
import {IStaffRepository} from "./IStaffRepository";
import {StaffEntity} from "../../entities/StaffEntity";

@injectable()
export class StaffRepository implements IStaffRepository {
    private readonly staffRepository: Repository<StaffEntity>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.staffRepository = this.dataSource.getRepository(StaffEntity);
    }

    async findAll(): Promise<StaffEntity[] | null> {
        return this.staffRepository.find({
            where: {deletedAt: null}
        });
    }

    async create(staff: StaffEntity): Promise<boolean> {
        try {
            const newStaff = this.staffRepository.create(staff);
            await this.staffRepository.save(newStaff);
            return true; // 儲存成功時回傳 true
        } catch (error) {
            console.error('儲存員工時發生錯誤:', error); // 可以記錄錯誤資訊
            return false; // 發生錯誤時回傳 false
        }
    }

    async delete(id: number): Promise<boolean> {
        const staffEntity = await this.staffRepository.findOneBy({id});
        if (staffEntity) {
            // await this.staffRepository.remove(staffEntity);
            staffEntity.deletedAt = new Date();
            await this.staffRepository.save(staffEntity);
            return true;
        } else {
            // throw new Error(`ID 為 ${id} 的員工未找到`);
            return false;
        }
    }
}