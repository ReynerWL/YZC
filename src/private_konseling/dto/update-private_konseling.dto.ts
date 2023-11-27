import { PartialType } from "@nestjs/mapped-types";
import { CreatePrivateKonselingDto } from "./create-private_konseling.dto";

export class UpdatePrivateKonselingDto extends PartialType(CreatePrivateKonselingDto){}