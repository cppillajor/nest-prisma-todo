import { Injectable, Logger } from '@nestjs/common';
import { CreateBackgroundProcessorDto } from './dto/create-background-processor.dto';
import { UpdateBackgroundProcessorDto } from './dto/update-background-processor.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { PrismaService } from './prisma/prisma.service';


@Injectable()
export class BackgroundProcessorService {
  constructor(@InjectQueue('transcode') private transcodeQueue: Queue,private readonly prismaService: PrismaService) {}
  
  async getAllTasks(userId:number){
    const allTask= await this.prismaService.getAllTasks(userId)
    const job = await this.transcodeQueue.add([
      ...allTask
    ]);
    return allTask;
  }
}
