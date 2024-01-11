import { IsAlpha, IsArray, IsEnum, IsNotEmpty } from "class-validator";

export class CreatePrivateKonselingDto{
    @IsNotEmpty()
    psikolog: string

    @IsNotEmpty()
    @IsArray()
    datetime: Date[]

    @IsNotEmpty()
    price: number

    alasan: string
}