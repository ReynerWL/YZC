import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusAcount } from '../entities/user_yzc.entity';
import { GenderProduct, Religion } from '#/customer/entities/customer.entity';

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
  @IsEnum(GenderProduct)
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

export class InactiveUser{
  @IsNotEmpty()
  @IsString()
  alasan: string

  status: 'not active'
}