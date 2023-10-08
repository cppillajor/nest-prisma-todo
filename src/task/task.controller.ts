import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards,Req, UnauthorizedException  } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';import { AuthGuard } from 'src/auth/guards/auth.guard';
;
import { Request } from 'express';
import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto,@Req() request: Request) {
    const user = request['user'];
    const NewcreateTaskDto:Task = {
      ...createTaskDto,
      dueBy: new Date(createTaskDto.dueBy),
      userId:user.id,
      id:undefined
    }
    console.log(createTaskDto)
    try {
      const createdTask = await this.tasksService.createTask(NewcreateTaskDto);
      return createdTask;
    } catch (error) {
      console.log(error)
      throw new HttpException('Error al crear la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Req() request: Request) {
    try {
      const user = request['user'];
      if(user.rol!=="admin"){
        return new UnauthorizedException();
      }
      const tasks = await this.tasksService.getAllTasks();
      return tasks;
    } catch (error) {
      throw new HttpException('Error al obtener las tareas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string,@Req() request: Request) {
    try {
      const user = request['user'];
      const taskId : number = parseInt(id, 10); 
      const task = await this.tasksService.getTaskById(taskId,user.id);
      if (!task) {
        return new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException('Error al obtener la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,@Req() request: Request) {
    try {
      const user = request['user'];
      const taskId : number = parseInt(id, 10); 
      const task = await this.tasksService.getTaskById(taskId,user.id);
      if (!task) {
        return new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
      }
      updateTaskDto = {
        ...updateTaskDto,
        dueBy: updateTaskDto.dueBy ? new Date(updateTaskDto.dueBy) : undefined,
      }
      const updatedTask = await this.tasksService.updateTask(taskId, updateTaskDto);
      if (!updatedTask) {
        return new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
      }
      return updatedTask;
    } catch (error) {
      throw new HttpException('Error al actualizar la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string,@Req() request: Request) {
    try {
      const user = request['user'];
      const taskId : number = parseInt(id, 10); 
      const task = await this.tasksService.getTaskById(taskId,user.id);
      if (!task) {
        return new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
      }
      const deletedTask = await this.tasksService.deleteTask(taskId);
      if (!deletedTask) {
        return new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
      }
      return { message: 'Tarea eliminada satisfactoriamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
