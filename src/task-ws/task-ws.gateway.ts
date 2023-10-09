import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { TaskWsService } from './task-ws.service';
import { CreateTaskWDto } from './dto/create-task-w.dto';
import { UpdateTaskWDto } from './dto/update-task-w.dto';
import { Socket,Server } from 'socket.io';
import { Task } from '@prisma/client';

@WebSocketGateway({cors:true})
export class TaskWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly taskWsService: TaskWsService) {}
  async handleConnection(client: Socket) {
    this.taskWsService.registerClient(client)
    this.wss.emit('clients-updated',this.taskWsService.getConnectedClients())
    const listTask=await this.taskWsService.getAllTasks()
    this.wss.emit('message-from-server',{
      fullName : 'el administrador creo una nueva tarea: ',
      message:listTask || 'no message',
    })
  }
  handleDisconnect(client: Socket) {
    this.taskWsService.removeClient(client.id);
    this.wss.emit('clients-updated',this.taskWsService.getConnectedClients())
  }

  @SubscribeMessage('message-from-client')
  async onMessageFromClient(client: Socket,payload:CreateTaskWDto){  
    const today = new Date(); 
    const formattedDate = today.toISOString(); 
    const newTask : Task = {
      id:undefined,
      dueBy:today,
      name:payload.message,
      userId:5
    }
    await this.taskWsService.createTask(newTask);
    const listTask=await this.taskWsService.getAllTasks()
    this.wss.emit('message-from-server',{
      fullName : 'el administrador creo una nueva tarea: ',
      message:listTask || 'no message',
    }) 
  }  
}
