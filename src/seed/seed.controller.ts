import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { initialData } from './data/seed-data';

@Controller('seed')
export class SeedController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async createUser() {
    const userData = initialData;
    const user: User = initialData.users[0];
    try {
      const createdUser = await this.prismaService.createUser(user);
      return createdUser;
    } catch (error) {
      throw new HttpException('Error al crear el usuario ', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
