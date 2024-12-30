import {IsNotEmpty, IsNumber, Max, Min} from "class-validator";

export class DailySalesCreateRequest {
    @IsNumber({}, { message: "項目 必須是數字" })
    @IsNotEmpty({ message: "項目 是必填項" })
    dailySalesTypeId!: number;

    @IsNumber({}, { message: "類型 必須是數字" })
    @IsNotEmpty({ message: "類型 是必填項" })
    salesType!: number;

    @IsNotEmpty({message: "攤位是必填項"})
    @Min(1, {message: "攤位必須是 1.雜貨 2.水果"})
    @Max(2, {message: "攤位必須是 1.雜貨 2.水果"})
    stall!: number;

    @IsNumber({}, {message: "金額必須是數字"})
    @IsNotEmpty({message: "金額是必填項"})
    money!: number;
}
