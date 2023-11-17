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
    @IsEnum(GenderProduct)
    gender: GenderProduct;

    @IsNotEmpty()
    phone: number;

    @IsNotEmpty()
    lastEducation: string;

    @IsNotEmpty()
    @IsEnum(StatusPsikologAcount)
    status: StatusPsikologAcount;

    @IsNotEmpty()
    legality: string;

    @IsNotEmpty()
    aboutMe: string;
   
}