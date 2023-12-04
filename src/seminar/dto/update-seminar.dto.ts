import { PartialType } from "@nestjs/mapped-types";
import { CreateSeminarDto } from "./create-seminar.dto";
import { IsArray, IsEnum, IsNotEmpty } from "class-validator";
import { Psikolog } from "#/psikolog/entities/psikolog.entity";
import { Status } from "../entities/seminar.entity";

export class UpdateSeminarDto extends PartialType(CreateSeminarDto){
    @IsNotEmpty()
    customer: string

    @IsNotEmpty()
    @IsArray()
    psikolog: Psikolog[]

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    poster: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    datetime: Date

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status
}