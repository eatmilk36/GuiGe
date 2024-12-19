import {StaffEntity} from "../../entities/StaffEntity";

export interface IStaffRepository {
    findAll(): Promise<StaffEntity[] | null>

    create(supplier: StaffEntity): Promise<boolean>
}