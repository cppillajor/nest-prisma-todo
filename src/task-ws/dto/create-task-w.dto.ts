import { IsString, MinLength } from 'class-validator';

export class CreateTaskWDto {
    @IsString()
    @MinLength(1)
    message: string;
}
