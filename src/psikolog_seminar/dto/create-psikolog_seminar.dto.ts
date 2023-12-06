import { Psikolog } from "#/psikolog/entities/psikolog.entity";
import { IsArray, IsNotEmpty } from "class-validator";

export class CreatePsikologSeminarDto{
    @IsNotEmpty()
    @IsArray()
    psikolog: Psikolog[]

    @IsNotEmpty()
    seminar: string
}