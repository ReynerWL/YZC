import { PartialType } from "@nestjs/mapped-types";
import { CreateTransactionDto, CreateTransactionKonselingDto } from "./create-transaction.dto";

export class UpdateTransactionDto extends PartialType(CreateTransactionDto){}

export class UpdateTransactionKonselingDto extends PartialType(CreateTransactionKonselingDto){}
