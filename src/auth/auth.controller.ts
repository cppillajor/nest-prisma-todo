import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() createAuthDto: CreateAuthDto) {
    const login = await this.authService.login(createAuthDto);
    if (!login) {
      return new HttpException(
        'username y password no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    delete login.password;
    const token = await this.authService.createToken(login.username,login.role,login.id);
    const resultado = {
      ...login,
      token
    }
    return resultado;
  }
  @Post('register')
  async registration(@Body() createAuthDto: CreateAuthDto) {
    const newUser : User = {
      ...createAuthDto,
      role:"user",
      id:undefined
    }
    const register = await this.authService.registration(newUser);
    if (!register) {
      return new HttpException(
        'fallo el registro',
        HttpStatus.NOT_FOUND,
      );
    }
    delete register.password;    
    return register;
  }
}
