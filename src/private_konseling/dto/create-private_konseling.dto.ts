import { Status } from "#/seminar/entities/seminar.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreatePrivateKonselingDto{
    @IsNotEmpty()
    customer: string

    @IsNotEmpty()
    psikolog: string

    @IsNotEmpty()
    start_date: Date

    @IsNotEmpty()
    end_date: Date

    @IsNotEmpty()
    price: number

    @IsEnum(Status)
    status: Status

    alasan: string
}