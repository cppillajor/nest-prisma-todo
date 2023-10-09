import { Module } from '@nestjs/common';
import { BackgroundProcessorService } from './background-processor.service';
import { BackgroundProcessorController } from './background-processor.controller';
import { BullModule } from '@nestjs/bull';
import { BackgroundProcessorConsumer } from './background-processor.consumer';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
    }),
    inject: [ConfigService],
  }),
  ConfigModule.forRoot(),BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),BullModule.registerQueue({
    name: 'transcode',
  })],
  controllers: [BackgroundProcessorController],
  providers: [BackgroundProcessorService,BackgroundProcessorConsumer,PrismaService],
})
export class BackgroundProcessorModule {}
