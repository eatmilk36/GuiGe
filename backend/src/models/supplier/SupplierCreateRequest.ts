import { IsString, IsNotEmpty, Length } from "class-validator";

export class SupplierCreateRequest {
    @IsString()
    @IsNotEmpty({ message: "Username is required" })
    @Length(1, 20, { message: "Username must be between 1 and 20 characters" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Address is required" })
    @Length(10, 255, { message: "Address must be between 10 and 255 characters" })
    address: string;

    @IsString()
    @IsNotEmpty({ message: "Email is required" })
    @Length(10, 255, { message: "Email must be between 10 and 255 characters" })
    email: string;

    @IsString()
    @IsNotEmpty({ message: "Phone is required" })
    @Length(10, 10, { message: "Phone must be between 10 and 10 characters" })
    phone: string;
}
