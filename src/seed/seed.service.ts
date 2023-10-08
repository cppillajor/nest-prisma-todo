import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { User } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(user: User) {
    return this.prismaService.createUser(user);
  }
}
