import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
