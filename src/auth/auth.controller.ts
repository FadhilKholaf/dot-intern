import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from '../decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async singin(@Body() createAuthDto: CreateAuthDto) {
    try {
      return {
        token: await this.authService.signin(
          createAuthDto.username,
          createAuthDto.password,
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Post('signup')
  async singup(@Body() createAuthDto: CreateAuthDto) {
    try {
      return { token: await this.authService.signup(createAuthDto) };
    } catch (error) {
      throw error;
    }
  }
}
