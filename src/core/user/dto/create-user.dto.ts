import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
