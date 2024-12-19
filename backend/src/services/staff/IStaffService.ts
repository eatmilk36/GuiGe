import {StaffEntity} from "../../entities/StaffEntity";
import {StaffCreateRequest} from "../../models/staff/StaffCreateRequest";

export interface IStaffService {
    findAll(): Promise<StaffEntity[]>;

    create(req: StaffCreateRequest): Promise<boolean>
}
