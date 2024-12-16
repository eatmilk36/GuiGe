import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class ProductCreateRequest {
    @IsNumber({}, { message: "Supplier ID must be a number" })
    @IsNotEmpty({ message: "Supplier ID is required" })
    supplierId!: number;

    @IsString({ message: "Product name must be a string" })
    @IsNotEmpty({ message: "Product name is required" })
    @MaxLength(20, { message: "Product name must not exceed 20 characters" })
    name!: string;

    @IsNumber({}, { message: "Unit price must be a number" })
    @IsNotEmpty({ message: "Unit price is required" })
    unitPrice!: number;

    @IsString({ message: "Pricing unit must be a string" })
    @IsNotEmpty({ message: "Pricing unit is required" })
    @MaxLength(10, { message: "Pricing unit must not exceed 10 characters" })
    pricingUnit!: string;

    @IsNumber({}, { message: "Count must be a number" })
    @IsNotEmpty({ message: "Count is required" })
    count!: number;

    @IsString({ message: "Note must be a string" })
    @IsOptional() // 備註是選填欄位
    @MaxLength(255, { message: "Note must not exceed 255 characters" })
    note?: string;
}
