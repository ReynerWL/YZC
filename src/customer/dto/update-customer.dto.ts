import { PartialType } from "@nestjs/mapped-types";
import { CreateCustomerDto } from "./create-customer.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateCustomerDto extends PartialType(CreateCustomerDto){
    @IsNotEmpty()
    full_name: string

    @IsNotEmpty()
    birth_date: Date
    
    @IsNotEmpty()
    phone_number: string

    @IsNotEmpty()
    last_education: string
}