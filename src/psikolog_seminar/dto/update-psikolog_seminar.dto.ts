import { PartialType } from "@nestjs/mapped-types";
import { CreatePsikologSeminarDto } from "./create-psikolog_seminar.dto";

export class UpdatePsikologSeminarDto extends PartialType(CreatePsikologSeminarDto){}