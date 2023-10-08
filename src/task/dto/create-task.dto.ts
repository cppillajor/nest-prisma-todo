import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    name : string;
    @IsString()
    dueBy : Date;
}
