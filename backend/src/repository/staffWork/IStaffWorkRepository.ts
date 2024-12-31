import {StaffWorkEntity} from "../../entities/StaffWorkEntity";

export interface IStaffWorkRepository {
    findAll(): Promise<StaffWorkEntity[] | null>

    create(staffWork: StaffWorkEntity): Promise<boolean>

    delete(id: number): Promise<boolean>
}