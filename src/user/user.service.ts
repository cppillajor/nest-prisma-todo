// users/users.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: User) {
    return this.prismaService.createUser(user);
  }

  async getAllUsers() {
    return this.prismaService.getAllUsers();
  }

  async getUserById(userId: number) {
    return this.prismaService.getUserById(userId);
  }

  async updateUser(userId: number, userData: Partial<User>) {
    return this.prismaService.updateUser(userId, userData);
  }

  async deleteUser(userId: number) {
    return this.prismaService.deleteUser(userId);
  }

  async findUserByUsername(username: string) {
    return this.prismaService.findUserByUsername(username);
  }
}
