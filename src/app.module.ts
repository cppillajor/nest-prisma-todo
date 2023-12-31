import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './auth/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SeedModule } from './seed/seed.module';
import { TaskModule } from './task/task.module';
import { BackgroundProcessorModule } from './background-processor/background-processor.module';
import { TaskWsModule } from './task-ws/task-ws.module';

@Module({
  imports: [AuthModule, UserModule, SeedModule, TaskModule, BackgroundProcessorModule, TaskWsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
