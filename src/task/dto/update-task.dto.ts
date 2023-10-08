import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsDate, IsNumber, IsString } from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    name : string;
    @IsString()
    dueBy : Date;
}
