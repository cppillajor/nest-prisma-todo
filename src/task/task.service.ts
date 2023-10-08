import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from './prisma/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  async createTask(createTaskDto: Task) {
    // Llama a la función correspondiente en PrismaService para crear una tarea
    return this.prismaService.createTask(createTaskDto);
  }

  async getAllTasks() {
    // Llama a la función correspondiente en PrismaService para obtener todas las tareas
    return this.prismaService.getAllTasks();
  }

  async getTaskById(taskId: number,userId:number) {
    // Llama a la función correspondiente en PrismaService para obtener una tarea por su ID
    return this.prismaService.getTaskById(taskId,userId);
  }

  async updateTask(taskId: number, updateTaskDto: Partial<Task>) {
    // Llama a la función correspondiente en PrismaService para actualizar una tarea por su ID
    return this.prismaService.updateTask(taskId, updateTaskDto);
  }

  async deleteTask(taskId: number) {
    // Llama a la función correspondiente en PrismaService para eliminar una tarea por su ID
    return this.prismaService.deleteTask(taskId);
  }
}
