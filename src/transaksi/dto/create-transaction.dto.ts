import { Bank } from "#/bank/entities/bank.entity";
import { IsArray, IsEnum, IsNotEmpty, isArray } from "class-validator";
import { Status, Type } from "../entities/transaction.entity";
import { PrivateKonseling } from "#/private_konseling/entities/private_konseling.entity";
import { DetailOrder } from "#/detail_order/entities/detail_order.entity";
import { Seminar } from "#/seminar/entities/seminar.entity";

export class CreateTransactionDto{
    @IsNotEmpty()
    customer : string

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
    status: string = 'pending'

    @IsArray()
    detailOrder: CreateDetailOrderTransactionDto[]

}

export class CreateTransactionKonselingDto{
    @IsNotEmpty()
    customer : string

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
    status: string = 'pending'

    @IsArray()
    detailOrder: CreateDetailOrderTransactionDto[]

}

export class CreateDetailOrderTransactionDto{
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    types: string

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
 status: string = 'pending'

}