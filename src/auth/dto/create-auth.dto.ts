import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateAuthDto {
    @IsString()
    username : string;
    @IsString()
    password:string;
}
