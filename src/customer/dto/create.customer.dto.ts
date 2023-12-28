import { IsEnum, IsNotEmpty,} from "class-validator";

import { Gender, Religion} from "../entities/customer.entity";
import { GenderProduct } from "#/psikolog/entities/psikolog.entity";

export class CreateCustomerDto{
    @IsNotEmpty()
    user_yzc: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    birthDate: Date;

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @IsNotEmpty()
    @IsEnum(Religion)
    Religion: Religion;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    lastEducation: string;
}