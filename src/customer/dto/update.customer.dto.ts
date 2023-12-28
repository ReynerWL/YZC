import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsNotEmpty,} from "class-validator";
import { GenderProduct} from "../entities/customer.entity";
import { Religion } from "../entities/customer.entity";
import { CreateCustomerDto } from "./create.customer.dto";


export class UpdateCustomerDto extends PartialType(CreateCustomerDto){
    @IsNotEmpty()
     fullName: string;

    @IsNotEmpty()
    birthDate: Date;

    @IsNotEmpty()
    @IsEnum(GenderProduct)
    gender: GenderProduct;

    @IsNotEmpty()
    @IsEnum(Religion)
    Religion: Religion;
    
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    lastEducation: string;
}