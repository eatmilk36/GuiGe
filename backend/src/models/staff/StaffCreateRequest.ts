import {IsString, IsNotEmpty, Length, IsOptional} from "class-validator";

export class StaffCreateRequest {
    @IsString()
    @IsNotEmpty({message: "使用者名稱是必填項"})
    @Length(1, 20, {message: "使用者名稱必須介於 1 到 20 個字元之間"})
    name: string;

    @IsString()
    @IsNotEmpty({message: "電話號碼是必填項"})
    @Length(10, 10, {message: "電話號碼必須是 10 個字元"})
    phone: string;

    @IsString({ message: "備註必須是字串" })
    @IsOptional() // 備註是選填欄位
    @Length(0, 255, {message: "備註必須介於 0 到 255 個字元之間"})
    note: string;
}
