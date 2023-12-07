import { IsArray, IsEnum, IsNotEmpty } from "class-validator";
import { Status } from "../entities/seminar.entity";
import { Psikolog } from "#/psikolog/entities/psikolog.entity";
import { PsikologSeminar } from "#/psikolog_seminar/entities/psikolog_seminar.entity";

export class CreateSeminarDto{
    @IsNotEmpty()
    @IsArray()
    psikolog: string[]

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

    psikologSeminar: PsikologSeminar

}