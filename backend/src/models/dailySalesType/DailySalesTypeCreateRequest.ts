import {IsNotEmpty} from "class-validator";

export class DailySalesTypeCreateRequest {
    @IsNotEmpty({ message: "名稱是必填項" })
    name!: string;
}
