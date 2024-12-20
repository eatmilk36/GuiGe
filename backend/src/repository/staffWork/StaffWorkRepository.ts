import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";
import {IStaffWorkRepository} from "./IStaffWorkRepository";
import {StaffWorkEntity} from "../../entities/StaffWorkEntity";
import {StaffEntity} from "../../entities/StaffEntity";

@injectable()
export class StaffWorkRepository implements IStaffWorkRepository {
    private readonly staffWorkRepository: Repository<StaffWorkEntity>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.staffWorkRepository = this.dataSource.getRepository(StaffWorkEntity);
    }

    async findAll(): Promise<StaffWorkEntity[] | null> {
        return this.staffWorkRepository.find();
    }

    async create(staffWork: StaffWorkEntity): Promise<boolean> {
        try {

            const staffEntityRepository = this.dataSource.getRepository(StaffEntity);
            const staffEntity = await staffEntityRepository.findOneBy({id: staffWork.staffId});
            if (!staffEntity) {
                throw new Error("staff not found");
            }

            const staffWorkEntity = this.staffWorkRepository.create({
                workType: staffWork.workType,
                workCount: staffWork.workCount,
                staff: staffEntity,
            });
            await this.staffWorkRepository.save(staffWorkEntity);
            return true; // 儲存成功時回傳 true
        } catch (error) {
            console.error('Error saving staffWork', error); // 可以記錄錯誤資訊
            return false; // 發生錯誤時回傳 false
        }
    }
}