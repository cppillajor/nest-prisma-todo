// src/prisma/prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient,Task,User  } from '@prisma/client';

@Injectable()
export class PrismaService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  private readonly prisma: PrismaClient;

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  async createTask(data: Task) {
    return this.prisma.task.create({
      data,
    });
  }
  
  async getAllTasks() {
    const tasksWithUserData = await this.prisma.$queryRaw`
      SELECT t.*, u.username, u.role
      FROM Task t
      JOIN User u ON t.userId = u.id
      ORDER BY t.dueBy ASC;
    `;
    return tasksWithUserData;
  }
}
