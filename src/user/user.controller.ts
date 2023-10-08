import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser : User = {
      ...createUserDto,
      id: undefined   
    }
    return this.userService.createUser(newUser);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    try {
      const users = await this.userService.getAllUsers();
      return users;
    } catch (error) {
      throw new HttpException('Error al obtener los usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    try {
      const userId : number = parseInt(id, 10);
      const user = await this.userService.getUserById(userId);
      if (!user) {        
        return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      console.log(error)
      throw new HttpException('Error al obtener el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {        
    try {
      const updateUser : User = {
        ...updateUserDto,
        id: undefined   
      }
      const userId : number = parseInt(id, 10);
      const user = await this.userService.getUserById(userId);
      if (!user) {        
        return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      const updatedUser = await this.userService.updateUser(userId, updateUser);
      if (!updatedUser) {
        return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    try {
      const userId : number = parseInt(id, 10);
      const user = await this.userService.getUserById(userId);
      if (!user) {        
        return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      const deletedUser = await this.userService.deleteUser(userId);
      if (!deletedUser) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      return { message: 'Usuario eliminado satisfactoriamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
