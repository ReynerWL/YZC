import { IsEnum, IsNotEmpty,} from "class-validator";

import { GenderProduct, Religion} from "../entities/customer.entity";

export class CreateCustomerDto{
    @IsNotEmpty()
    user_yzc: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    birthDate: Date;

    @IsNotEmpty()
    @IsEnum(GenderProduct)
    gender: GenderProduct;

    @IsNotEmpty()
    @IsEnum(Religion)
    Religion: Religion;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    lastEducation: string;
}