import { Module } from '@nestjs/common';
import { TaskWsService } from './task-ws.service';
import { TaskWsGateway } from './task-ws.gateway';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [TaskWsGateway, TaskWsService,PrismaService],
})
export class TaskWsModule {}
