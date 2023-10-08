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

  // Función para crear una tarea
  async createTask(data: Task) {
    return this.prisma.task.create({
      data,
    });
  }

  // Función para obtener todas las tareas
  async getAllTasks() {
    return this.prisma.task.findMany();
  }

  // Función para obtener una tarea por ID
  async getTaskById(taskId: number,userId:number) {
    return this.prisma.task.findUnique({
      where: { id: taskId ,userId},
    });
  }

  // Función para actualizar una tarea por ID
  async updateTask(taskId: number, data: Partial<Task>) {
    return this.prisma.task.update({
      where: { id: taskId },
      data,
    });
  }

  // Función para eliminar una tarea por ID
  async deleteTask(taskId: number) {
    return this.prisma.task.delete({
      where: { id: taskId },
    });
  }
}
