import {IsNotEmpty, IsNumber} from "class-validator";

export class DailySalesCreateRequest {
    @IsNumber({}, { message: "項目 必須是數字" })
    @IsNotEmpty({ message: "項目 是必填項" })
    dailySalesTypeId!: number;

    @IsNumber({}, { message: "類型 必須是數字" })
    @IsNotEmpty({ message: "類型 是必填項" })
    salesType!: number;

    @IsNumber({}, { message: "金額必須是數字" })
    @IsNotEmpty({ message: "金額是必填項" })
    money!: number;
}
