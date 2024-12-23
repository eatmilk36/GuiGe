import {IsNotEmpty, IsNumber} from "class-validator";

export class DailySalesCreateRequest{
    @IsNumber({}, { message: "dailySalesTypeId must be a number" })
    @IsNotEmpty({ message: "dailySalesTypeId is required" })
    dailySalesTypeId!: number;

    @IsNumber({}, { message: "salesType must be a number" })
    @IsNotEmpty({ message: "salesType is required" })
    salesType!: number;

    @IsNumber({}, { message: "Money must be a number" })
    @IsNotEmpty({ message: "Money is required" })
    money!: number;
}
