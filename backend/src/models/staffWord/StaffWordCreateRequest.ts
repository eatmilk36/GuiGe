import { IsNotEmpty, IsInt, Min, Max } from "class-validator";

export class StaffWorkCreateRequest {
    @IsInt()
    @IsNotEmpty({ message: "員工 ID 是必填項" })
    staffId: number; // 員工ID

    @IsInt()
    @IsNotEmpty({ message: "工作類型是必填項" })
    @Min(1, { message: "工作類型必須是 1 (時薪)、2 (日薪) 或 3 (月薪)" })
    @Max(3, { message: "工作類型必須是 1 (時薪)、2 (日薪) 或 3 (月薪)" })
    workType: number; // 工作類型: 1.時薪 2.日薪 3.月薪

    @IsInt()
    @IsNotEmpty({ message: "工作數量是必填項" })
    @Min(1, { message: "工作數量必須至少為 1" })
    workCount: number; // 工作時數

    @IsInt()
    @IsNotEmpty({ message: "薪水是必填項" })
    @Min(1, { message: "薪水必須至少為 1" })
    pay: number; // 薪水
}
