import { Bank } from "#/bank/entities/bank.entity";
import { IsArray, IsEnum, IsNotEmpty, isArray } from "class-validator";
import { Status, Type } from "../entities/transaction.entity";
import { PrivateKonseling } from "#/private_konseling/entities/private_konseling.entity";
import { DetailOrder } from "#/detail_order/entities/detail_order.entity";

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
    transaction_amount: number

    @IsNotEmpty()
    exp_date: Date

    @IsNotEmpty()
    payment_proof: string

    @IsEnum(Status)
    status: string

    @IsArray()
    detailOrder: CreateDetailOrderTransactionDto[]

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
    transaction_amount: number

    @IsNotEmpty()
    exp_date: Date

    @IsNotEmpty()
    payment_proof: string

    @IsEnum(Status)
    status: string

    @IsArray()
    detailOrder: CreateDetailOrderTransactionDto[]

    alasan: string

}

export class CreateDetailOrderTransactionDto{
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    price: number
}

export class CreateTransactionPsikologDto{
 @IsNotEmpty()
 psikolog: string

 @IsNotEmpty()
 bank: string

 @IsNotEmpty()
 exp_date: Date

 @IsNotEmpty()
 @IsEnum(Type)
 type: Type

 @IsNotEmpty()
 payment_proof: string

 @IsEnum(Status)
 status: string

 @IsArray()
 detailOrder: CreateDetailOrderTransactionDto[]

 alasan: string
}