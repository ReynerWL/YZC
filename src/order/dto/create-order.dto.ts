import { IsEnum, IsNotEmpty } from "class-validator";
import { Status } from "../entities/order.entity";

export class CreateOrderYzcDto{
    @IsNotEmpty()
    transaction_amount: Number

    @IsNotEmpty()
    exp_date: Date

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status

    @IsNotEmpty()
    customer: string

    seminar: string

    private_konseling: string

}