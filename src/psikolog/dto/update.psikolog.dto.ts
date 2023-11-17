import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsEnum} from "class-validator";
import { GenderProduct } from "../entities/psikolog.entity";
import { StatusPsikologAcount } from "../entities/psikolog.entity";

export class UpdatePsikolog {
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