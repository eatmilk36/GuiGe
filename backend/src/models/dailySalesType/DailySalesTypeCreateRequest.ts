import {IsNotEmpty} from "class-validator";

export class DailySalesTypeCreateRequest{
    @IsNotEmpty({ message: "Name is required" })
    name!: string;
}
