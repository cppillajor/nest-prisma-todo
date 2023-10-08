import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService,private readonly jwtService: JwtService) {}
  findUserByUsername(createAuthDto: CreateAuthDto) {
    return this.prismaService.findUserByUsername(createAuthDto.username);
  }
  login(createAuthDto: CreateAuthDto) {
    return this.prismaService.login(createAuthDto.username,createAuthDto.password);
  }
  async createToken(username: string,rol:string,id:number) {
    const payload = { username,rol,id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async registration(user: User) {
    return this.prismaService.registration(user);
  }


}
