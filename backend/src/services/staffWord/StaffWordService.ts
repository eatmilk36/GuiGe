import {inject, injectable} from "tsyringe";
import {IStaffWorkService} from "./IStaffWordService";
import {IStaffWorkRepository} from "../../repository/staffWork/IStaffWorkRepository";
import {StaffWorkEntity} from "../../entities/StaffWorkEntity";
import {StaffWorkCreateRequest} from "../../models/staffWord/StaffWordCreateRequest";


@injectable()
export class StaffWorkService implements IStaffWorkService {
    constructor(@inject("IStaffWorkRepository") private readonly staffWorkRepository: IStaffWorkRepository) {
    }

    async findAll(): Promise<StaffWorkEntity[]> {
        return await this.staffWorkRepository.findAll();
    }

    async create(req: StaffWorkCreateRequest): Promise<boolean> {
        let staffWork: StaffWorkEntity = new StaffWorkEntity();
        staffWork.workType = req.workType;
        staffWork.workCount = req.workCount;
        staffWork.staffId = req.staffId;
        staffWork.pay = req.pay;

        return await this.staffWorkRepository.create(staffWork);
    }
}
