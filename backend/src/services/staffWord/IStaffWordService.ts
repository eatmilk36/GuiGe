import {StaffWorkEntity} from "../../entities/StaffWorkEntity";
import {StaffWorkCreateRequest} from "../../models/staffWord/StaffWordCreateRequest";

export interface IStaffWorkService {
    findAll(): Promise<StaffWorkEntity[]>;

    create(req: StaffWorkCreateRequest): Promise<boolean>
}
