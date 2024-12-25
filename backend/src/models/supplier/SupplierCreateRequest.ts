import { IsString, IsNotEmpty, Length } from "class-validator";

export class SupplierCreateRequest {
    @IsString()
    @IsNotEmpty({ message: "供應商名稱是必填項" })
    @Length(1, 20, { message: "供應商名稱必須介於 1 到 20 個字元之間" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "地址是必填項" })
    @Length(10, 255, { message: "地址必須介於 10 到 255 個字元之間" })
    address: string;

    @IsString()
    @IsNotEmpty({ message: "電子郵件是必填項" })
    @Length(10, 255, { message: "電子郵件必須介於 10 到 255 個字元之間" })
    email: string;

    @IsString()
    @IsNotEmpty({ message: "電話是必填項" })
    @Length(10, 10, { message: "電話必須是 10 個字元" })
    phone: string;
}
