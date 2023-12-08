import { Bank } from "#/bank/entities/bank.entity";
import { IsArray, IsEnum, IsNotEmpty, isArray } from "class-validator";
import { Status, Type } from "../entities/transaction.entity";
import { PrivateKonseling } from "#/private_konseling/entities/private_konseling.entity";

export class CreateTransactionDto{
    @IsNotEmpty()
    customer : string

    @IsNotEmpty()
    seminar: string

    @IsNotEmpty()
    bank: string

    @IsNotEmpty()
    @IsEnum(Type)
    type: Type

    @IsNotEmpty()
    exp_date: Date

    @IsNotEmpty()
    payment_proof: string

    @IsEnum(Status)
    status: string

    alasan: string
}

export class CreateTransactionKonselingDto{
    @IsNotEmpty()
    customer : string

    @IsNotEmpty()
    @IsArray()
    privateKonseling: string[]

    @IsNotEmpty()
    bank: string

    @IsNotEmpty()
    @IsEnum(Type)
    type: Type

    @IsNotEmpty()
    exp_date: Date

    @IsNotEmpty()
    payment_proof: string

    @IsEnum(Status)
    status: string

    alasan: string

}