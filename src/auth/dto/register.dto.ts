import {  Gender, Religion } from "#/customer/entities/customer.entity";
import { GenderProduct } from "#/psikolog/entities/psikolog.entity";
import { Status } from "#/seminar/entities/seminar.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

export class RegisterDto{
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
    gender: Gender

    @IsNotEmpty()
    @IsEnum(Religion)
    religion: Religion

    @IsNotEmpty()
    phone_number: string

    @IsNotEmpty()
    last_education: string

}

export class RegisterPsikologDto{
    // @IsNotEmpty()
    level_user: any

    // @IsNotEmpty()
    user_yzc: string;

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    phone_number: string

    @IsNotEmpty()
    photo: string;

    @IsNotEmpty()
    full_name: string
   
    @IsNotEmpty()
    // @IsEnum(Gender)
    gender: GenderProduct

    @IsNotEmpty()
    last_education: string

    @IsNotEmpty()
    legality: string;

    @IsNotEmpty()
    aboutMe: string;
    
}