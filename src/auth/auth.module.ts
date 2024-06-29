import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../core/user/user.service';
import { PrismaService } from '../lib/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, JwtService],
})
export class AuthModule {}
