import {IsNotEmpty, IsNumber} from "class-validator";

export class DailySalesCreateRequest{
    @IsNumber({}, { message: "saleType must be a number" })
    @IsNotEmpty({ message: "saleType is required" })
    saleType!: number;

    @IsNumber({}, { message: "Money must be a number" })
    @IsNotEmpty({ message: "Money is required" })
    money!: number;
}
