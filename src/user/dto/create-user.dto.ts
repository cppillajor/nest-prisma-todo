import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    username : string;
    @IsString()
    @MinLength(2)
    password : string;
    @IsString()
    role : string;
}
