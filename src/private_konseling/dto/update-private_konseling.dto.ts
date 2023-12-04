import { PartialType } from "@nestjs/mapped-types";
import { CreatePrivateKonselingDto } from "./create-private_konseling.dto";
import { IsEnum, IsNotEmpty } from "class-validator";
import { Status } from "#/seminar/entities/seminar.entity";

export class UpdatePrivateKonselingDto extends PartialType(CreatePrivateKonselingDto){
    @IsNotEmpty()
    customer: string

    @IsNotEmpty()
    psikolog: string

    @IsNotEmpty()
    datetime: Date

    @IsNotEmpty()
    price: Number

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status
}