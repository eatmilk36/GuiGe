import {inject, injectable} from "tsyringe";
import {IStaffService} from "./IStaffService";
import {IStaffRepository} from "../../repository/staff/IStaffRepository";
import {StaffEntity} from "../../entities/StaffEntity";
import {StaffCreateRequest} from "../../models/staff/StaffCreateRequest";

@injectable()
export class StaffService implements IStaffService {
    constructor(@inject("IStaffRepository") private readonly staffRepository: IStaffRepository) {
    }

    async findAll(): Promise<StaffEntity[]> {
        return await this.staffRepository.findAll();
    }

    async create(req: StaffCreateRequest): Promise<boolean> {
        let staff: StaffEntity = new StaffEntity();
        staff.name = req.name;
        staff.phone = req.phone;
        staff.note = req.note;

        return await this.staffRepository.create(staff);
    }

    async deleted(id: number): Promise<boolean> {
        return await this.staffRepository.delete(id);
    }
}
