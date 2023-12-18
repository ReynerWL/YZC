import { IsNotEmpty, IsEnum} from "class-validator";
import { GenderProduct } from "../entities/psikolog.entity";
import { StatusPsikologAcount } from "../entities/psikolog.entity";

export class CreatePsikologDto{
    @IsNotEmpty()
    user_yzc: string;
    
    @IsNotEmpty()
    photo: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @IsNotEmpty()
    phone_number: string;

    @IsNotEmpty()
    lastEducation: string;

    @IsNotEmpty()
    legality: string;

    @IsNotEmpty()
    aboutMe: string;
   
}