import { PartialType } from "@nestjs/mapped-types";
import { CreatePrivateKonselingDto } from "./create-private_konseling.dto";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdatePrivateKonselingDto extends PartialType(CreatePrivateKonselingDto){

    alasan?: string;
}