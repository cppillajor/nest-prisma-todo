// src/prisma/prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient,Task,User  } from '@prisma/client';

@Injectable()
export class PrismaService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  private readonly prisma: PrismaClient;
 
  async getAllTasks(userId:number) {
    return this.prisma.task.findMany({
      where: { userId},
      orderBy: {
        dueBy: 'asc',
      },
    });
  }
}
