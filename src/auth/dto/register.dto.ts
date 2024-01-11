import { Religion } from "#/customer/entities/customer.entity";
import { GenderProduct } from "#/psikolog/entities/psikolog.entity";
import { IsEnum, IsNotEmpty, isNotEmpty } from "class-validator";

export class RegisterDto{
    // @IsNotEmpty()
    level_user: '2b9814f9-befa-41e4-9f95-1f759b411801'

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
    level_user: '703f41b0-1004-4965-a3ff-9c71f5fc4f6f'

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
    caseHandled: string
    
    @IsNotEmpty()
    @IsEnum(Religion)
    religion: Religion

    @IsNotEmpty()
    birth_date: Date

    @IsNotEmpty()
    spesialis: string
}