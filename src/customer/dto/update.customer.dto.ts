import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsNotEmpty,} from "class-validator";
import { Gender, Religion } from "../entities/customer.entity";
import { CreateCustomerDto } from "./create.customer.dto";
import { GenderProduct } from "#/psikolog/entities/psikolog.entity";


export class UpdateCustomerDto extends PartialType(CreateCustomerDto){
    @IsNotEmpty()
     fullName: string;

    @IsNotEmpty()
    birthDate: Date;

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @IsNotEmpty()
    @IsEnum(Religion)
    Religion: Religion;
    
    @IsNotEmpty()
    phone_number: string;

    @IsNotEmpty()
    lastEducation: string;
}