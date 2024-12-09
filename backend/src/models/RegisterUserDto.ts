import { IsString, IsNotEmpty, Length } from "class-validator";

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty({ message: "Username is required" })
    @Length(4, 20, { message: "Username must be between 4 and 20 characters" })
    username: string;

    @IsString()
    @IsNotEmpty({ message: "Password is required" })
    @Length(4, 20, { message: "Password must be between 4 and 20 characters" })
    password: string;

    @IsString()
    @IsNotEmpty({ message: "Email is required" })
    @Length(10, 255, { message: "Email must be between 10 and 255 characters" })
    email: string;
}
