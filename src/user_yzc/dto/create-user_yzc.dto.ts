import { IsNotEmpty } from 'class-validator';

export class CreateUserYzcDto {
  @IsNotEmpty()
  level_user: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
