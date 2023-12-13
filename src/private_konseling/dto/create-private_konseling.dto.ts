import { Status } from "#/seminar/entities/seminar.entity";
import { IsAlpha, IsArray, IsEnum, IsNotEmpty } from "class-validator";

export class CreatePrivateKonselingDto{
    @IsNotEmpty()
    psikolog: string

    @IsNotEmpty()
    @IsArray()
    datetime: Date[]

    @IsNotEmpty()
    price: number

    @IsEnum(Status)
    status: string = 'pending'

    alasan: string
}