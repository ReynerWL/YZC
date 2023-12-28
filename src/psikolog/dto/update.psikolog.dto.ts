import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsEnum} from "class-validator";

import { CreatePsikologDto } from './create.psikolog.dto';
import { GenderProduct } from '../entities/psikolog.entity';


export class UpdatePsikologDto extends PartialType(CreatePsikologDto){
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
}