// src/prisma/prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient,User  } from '@prisma/client';

@Injectable()
export class PrismaService {
  constructor() {
    this.prisma = new PrismaClient();
  }
  private readonly prisma: PrismaClient;
  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
  async createUser(user: User) {
    return this.prisma.user.create({
      data: user,
    });
  }
}
