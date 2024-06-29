import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './core/user/user.controller';
import { PostController } from './core/post/post.controller';
import { PostModule } from './core/post/post.module';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './core/user/user.service';
import { PostService } from './core/post/post.service';
import { PrismaService } from './lib/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PostModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, UserController, PostController],
  providers: [
    AppService,
    UserService,
    PostService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
    JwtService,
  ],
})
export class AppModule {}
