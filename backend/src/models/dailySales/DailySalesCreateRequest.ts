import {IsNotEmpty, IsNumber} from "class-validator";

export class DailySalesCreateRequest{
    @IsNumber({}, { message: "Type must be a number" })
    @IsNotEmpty({ message: "Type is required" })
    type!: number;

    @IsNumber({}, { message: "Money must be a number" })
    @IsNotEmpty({ message: "Money is required" })
    money!: number;
}
