import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusAcount } from '../entities/user_yzc.entity';
import { Religion } from '#/customer/entities/customer.entity';
import { GenderProduct } from '#/psikolog/entities/psikolog.entity';

export class CreateUserYzcDto {
  // @IsNotEmpty()
  level_user: any

  // @IsNotEmpty()
  user_yzc: string;

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  full_name: string

  @IsNotEmpty()
  birth_date: Date

  @IsNotEmpty()
  // @IsEnum(Gender)
  gender: GenderProduct

  @IsNotEmpty()
  @IsEnum(Religion)
  religion: Religion

  @IsNotEmpty()
  phone_number: string

  @IsNotEmpty()
  last_education: string

  @IsEnum(StatusAcount)
  status: StatusAcount

  salt: string
}
