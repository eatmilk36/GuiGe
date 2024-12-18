import {IsNotEmpty, IsNumber} from "class-validator";

export class DailySalesTypeCreateRequest{

    @IsNumber({}, { message: "dailySalesId must be a number" })
    @IsNotEmpty({ message: "dailySalesId is required" })
    dailySalesId!: number;

    @IsNotEmpty({ message: "Name is required" })
    name!: string;
}
