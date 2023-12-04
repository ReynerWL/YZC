import { IsEnum, IsNotEmpty } from "class-validator";
import { Gender, Religion } from "../entities/customer.entity";

export class CreateCustomerDto{
    @IsNotEmpty()
    user_yzc: string
    
    @IsNotEmpty()
    full_name: string

    @IsNotEmpty()
    birth_date: Date

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender

    @IsNotEmpty()
    @IsEnum(Religion)
    religion: Religion

    @IsNotEmpty()
    phone_number: string

    @IsNotEmpty()
    last_education: string
}