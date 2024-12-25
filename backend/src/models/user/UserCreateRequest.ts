import { IsString, IsNotEmpty, Length } from "class-validator";

export class UserCreateRequest {
    @IsString()
    @IsNotEmpty({ message: "使用者名稱是必填項" })
    @Length(4, 20, { message: "使用者名稱必須介於 4 到 20 個字元之間" })
    username: string;

    @IsString()
    @IsNotEmpty({ message: "密碼是必填項" })
    @Length(4, 20, { message: "密碼必須介於 4 到 20 個字元之間" })
    password: string;

    @IsString()
    @IsNotEmpty({ message: "電子郵件是必填項" })
    @Length(10, 255, { message: "電子郵件必須介於 10 到 255 個字元之間" })
    email: string;
}
