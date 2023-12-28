import { PartialType } from "@nestjs/mapped-types";
import { CreateTransactionDto, CreateTransactionKonselingDto, CreateTransactionPsikologDto } from "./create-transaction.dto";
import { IsString } from "class-validator";

export class UpdateTransactionDto extends PartialType(CreateTransactionDto){
    alasan?: string;
}

export class UpdateTransactionKonselingDto extends PartialType(CreateTransactionKonselingDto){}

export class UpdateTransactionPsikologDto extends PartialType(CreateTransactionPsikologDto){}

export class RejectTransactionDto{
    @IsString()
    alasan: string
    
    status: 'reject'
}