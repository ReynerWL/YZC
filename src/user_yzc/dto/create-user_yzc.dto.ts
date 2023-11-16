import { IsNotEmpty } from 'class-validator';

export class CreateUserYzcDto {
  @IsNotEmpty()
  id_level_user: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
