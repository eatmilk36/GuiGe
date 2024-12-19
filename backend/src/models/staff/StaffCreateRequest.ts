import {IsString, IsNotEmpty, Length, IsOptional} from "class-validator";

export class StaffCreateRequest {
    @IsString()
    @IsNotEmpty({message: "Username is required"})
    @Length(1, 20, {message: "Username must be between 1 and 20 characters"})
    name: string;

    @IsString()
    @IsNotEmpty({message: "Phone is required"})
    @Length(10, 10, {message: "Phone must be between 10 and 10 characters"})
    phone: string;

    @IsString({ message: "Note must be a string" })
    @IsOptional() // 備註是選填欄位
    @Length(0, 255, {message: "Note must be between 0 and 500 characters"})
    note: string;
}
