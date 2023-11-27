import { Status } from "#/seminar/entities/seminar.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreatePrivateKonselingDto{
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