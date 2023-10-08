import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, MinLength } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    username : string;
    @IsString()
    @MinLength(2)
    password : string;
    @IsString()
    role : string;
}
