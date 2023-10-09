import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, Req } from '@nestjs/common';
import { BackgroundProcessorService } from './background-processor.service';
import { CreateBackgroundProcessorDto } from './dto/create-background-processor.dto';
import { UpdateBackgroundProcessorDto } from './dto/update-background-processor.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';

@Controller('background-processor')
export class BackgroundProcessorController {
  constructor(private readonly backgroundProcessorService: BackgroundProcessorService) {}

  @Post('transcode')
  @UseGuards(AuthGuard)
  async transcode(@Req() request: Request){
    
    try {
      const user = request['user'];
      return this.backgroundProcessorService.getAllTasks(user.id);
    } catch (error) {
      console.log(error)
      throw new HttpException('Error al crear la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
