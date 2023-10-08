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

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(userId: number) {
    console.log
    (userId)
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async updateUser(userId: number, userData: Partial<User>) {
    return this.prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }

  async deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
}
