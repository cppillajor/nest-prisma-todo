import { PartialType } from '@nestjs/mapped-types';
import { CreateBackgroundProcessorDto } from './create-background-processor.dto';

export class UpdateBackgroundProcessorDto extends PartialType(CreateBackgroundProcessorDto) {}
