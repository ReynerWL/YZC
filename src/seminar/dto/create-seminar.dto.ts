import { IsArray, IsEnum, IsNotEmpty } from "class-validator";
import { Status } from "../entities/seminar.entity";
import { Psikolog } from "#/psikolog/entities/psikolog.entity";

export class CreateSeminarDto{
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