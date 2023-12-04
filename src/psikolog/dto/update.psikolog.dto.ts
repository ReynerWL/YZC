import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsEnum} from "class-validator";
import { GenderProduct } from "../entities/psikolog.entity";
import { CreatePsikologDto } from './create.psikolog.dto';
import { Gender } from '#/customer/entities/customer.entity';

export class UpdatePsikolog extends PartialType(CreatePsikologDto){
    @IsNotEmpty()
    photo: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @IsNotEmpty()
    phone: number;

    @IsNotEmpty()
    lastEducation: string;

    @IsNotEmpty()
    legality: string;

    @IsNotEmpty()
    aboutMe: string;
}