import { IsNotEmpty } from "class-validator";

export class CreateBankDto{
    @IsNotEmpty()
    bank_name: string

    @IsNotEmpty()
    account_owner_name: string

    @IsNotEmpty()
    account_number: string

    @IsNotEmpty()
    qr: string

    userYzc: string

    psikolog: string
}