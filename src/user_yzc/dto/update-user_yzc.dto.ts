import { PartialType } from '@nestjs/mapped-types';
import { CreateUserYzcDto } from './create-user_yzc.dto';

export class UpdateUserYzcDto extends PartialType(CreateUserYzcDto) {}
