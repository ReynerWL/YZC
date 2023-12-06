import { IsNotEmpty } from "class-validator";

export class CreateCaseHandledDto{
    @IsNotEmpty()
    psikolog: string

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    start_date: Date

    @IsNotEmpty()
    end_date: Date

    @IsNotEmpty()
    description: string
}