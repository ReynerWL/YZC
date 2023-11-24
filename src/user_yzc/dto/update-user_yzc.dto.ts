import { PartialType } from '@nestjs/mapped-types';
import { CreateUserYzcDto } from './create-user_yzc.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusAcount } from '../entities/user_yzc.entity';

export class UpdateUserYzcDto extends PartialType(CreateUserYzcDto) {
    @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(StatusAcount)
  status: StatusAcount
}
