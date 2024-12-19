import { IsNotEmpty, IsInt, Min, Max } from "class-validator";

export class StaffWorkCreateRequest {
    @IsInt()
    @IsNotEmpty({ message: "Staff ID is required" })
    staffId: number; // 員工ID

    @IsInt()
    @IsNotEmpty({ message: "Work type is required" })
    @Min(1, { message: "Work type must be 1 (hourly), 2 (daily), or 3 (monthly)" })
    @Max(3, { message: "Work type must be 1 (hourly), 2 (daily), or 3 (monthly)" })
    workType: number; // 工作類型: 1.時薪 2.日薪 3.月薪

    @IsInt()
    @IsNotEmpty({ message: "Work count is required" })
    @Min(1, { message: "Work count must be at least 1" })
    workCount: number; // 工作時數
}
