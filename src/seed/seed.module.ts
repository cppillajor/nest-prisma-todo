import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PrismaService } from './prisma/prisma.service';
@Module({
  controllers: [SeedController],
  providers: [SeedService,PrismaService],

})
export class SeedModule {}
