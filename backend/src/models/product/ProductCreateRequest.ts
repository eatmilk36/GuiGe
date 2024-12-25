import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class ProductCreateRequest {
    @IsNumber({}, { message: "供應商 ID 必須是數字" })
    @IsNotEmpty({ message: "供應商 ID 是必填項" })
    supplierId!: number;

    @IsString({ message: "產品名稱必須是字串" })
    @IsNotEmpty({ message: "產品名稱是必填項" })
    @MaxLength(20, { message: "產品名稱不得超過 20 個字元" })
    name!: string;

    @IsNumber({}, { message: "單價必須是數字" })
    @IsNotEmpty({ message: "單價是必填項" })
    unitPrice!: number;

    @IsString({ message: "計價單位必須是字串" })
    @IsNotEmpty({ message: "計價單位是必填項" })
    @MaxLength(10, { message: "計價單位不得超過 10 個字元" })
    pricingUnit!: string;

    @IsNumber({}, { message: "數量必須是數字" })
    @IsNotEmpty({ message: "數量是必填項" })
    count!: number;

    @IsString({ message: "備註必須是字串" })
    @IsOptional() // 備註是選填欄位
    @MaxLength(255, { message: "備註不得超過 255 個字元" })
    note?: string;
}
