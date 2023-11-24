import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusAcount } from '../entities/user_yzc.entity';

export class CreateUserYzcDto {
  @IsNotEmpty()
  level_user: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(StatusAcount)
  status: StatusAcount
}
