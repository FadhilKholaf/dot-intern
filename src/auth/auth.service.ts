import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../core/user/user.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserService,
    private readonly jwt: JwtService,
  ) {}

  async signin(username: string, password: string) {
    try {
      const user = await this.user.findOneByUsername({ username });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const validPassword = compareSync(password, user.password);
      if (!validPassword) {
        throw new ForbiddenException('Invalid password');
      }
      return await this.jwt.signAsync(user, {
        secret: process.env.JWT_SECRET,
        expiresIn: 1000 * 60 * 60,
      });
    } catch (error) {
      throw error;
    }
  }

  async signup(data: CreateAuthDto) {
    try {
      const user = await this.user.findOneByUsername({
        username: data.username,
      });
      if (user) {
        throw new ConflictException('User already exist');
      }
      return await this.user.create(data).then(async (result) => {
        return await this.jwt.signAsync(result, {
          secret: process.env.JWT_SECRET,
          expiresIn: 1000 * 60 * 60,
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
