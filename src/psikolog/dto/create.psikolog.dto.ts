import { IsNotEmpty, IsEnum, isNotEmpty} from "class-validator";
import { GenderProduct } from "../entities/psikolog.entity";
import { Religion } from "#/customer/entities/customer.entity";

export class CreatePsikologDto{
    @IsNotEmpty()
    user_yzc: string;
    
    @IsNotEmpty()
    photo: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsEnum(GenderProduct)
    gender: GenderProduct;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    lastEducation: string;

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