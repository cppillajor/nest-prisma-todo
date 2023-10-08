// src/prisma/prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient,User  } from '@prisma/client';

@Injectable()
export class PrismaService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  private readonly prisma: PrismaClient;

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
  async login(username: string,password: string) {
    return this.prisma.user.findFirst({
      where: { username,password },
    });
  }
  async registration(user: User) {
    return this.prisma.user.create({
      data: user,
    });
  }
}
