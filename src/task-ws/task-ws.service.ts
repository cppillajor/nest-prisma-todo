import { Injectable } from '@nestjs/common';
import { CreateTaskWDto } from './dto/create-task-w.dto';
import { UpdateTaskWDto } from './dto/update-task-w.dto';
import { Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { Task } from '@prisma/client';
interface ConnectedClients{
  [id:string]:Socket
}
@Injectable()
export class TaskWsService {
  private connectedClients: ConnectedClients = {};
  constructor(
    private readonly prismaService: PrismaService,    
  ) {}
    registerClient(client:Socket){
      this.connectedClients[client.id]=client
    }
    removeClient(clientId:string){ 
      delete this.connectedClients[clientId]
    }
    getConnectedClients():string[]{
      return Object.keys(this.connectedClients)
    }

    async createTask(createTaskDto: Task) {
      // Llama a la función correspondiente en PrismaService para crear una tarea
      return this.prismaService.createTask(createTaskDto);
    }
    async getAllTasks() {
      // Llama a la función correspondiente en PrismaService para crear una tarea
      return this.prismaService.getAllTasks();
    }

  findAll() {
    return `This action returns all taskWs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskW`;
  }

  update(id: number, updateTaskWDto: UpdateTaskWDto) {
    return `This action updates a #${id} taskW`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskW`;
  }
}
