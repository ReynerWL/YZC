import { Religion } from "#/customer/entities/customer.entity";
import { GenderProduct } from "#/psikolog/entities/psikolog.entity";
import { Status } from "#/seminar/entities/seminar.entity";
import { IsEnum, IsNotEmpty, isNotEmpty } from "class-validator";

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
    @IsEnum(GenderProduct)
    gender: GenderProduct

    @IsNotEmpty()
    @IsEnum(Religion)
    religion: Religion

    @IsNotEmpty()
    phone: string

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
    phone: string

    @IsNotEmpty()
    photo: string;

    @IsNotEmpty()
    full_name: string
   
    @IsNotEmpty()
    @IsEnum(GenderProduct)
    gender: GenderProduct

    @IsNotEmpty()
    last_education: string

    @IsNotEmpty()
    legality: string;

    @IsNotEmpty()
    aboutMe: string;
    
    @IsNotEmpty()
    @IsEnum(Religion)
    religion: Religion

    @IsNotEmpty()
    birth_date: Date
}