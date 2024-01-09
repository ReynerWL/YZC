import { PartialType } from "@nestjs/mapped-types";
import { CreatePsikologSeminarDto } from "./create-psikolog_seminar.dto";
import { IsEnum } from "class-validator";
import { Status } from "../entities/psikolog_seminar.entity";

export class UpdatePsikologSeminarDto extends PartialType(CreatePsikologSeminarDto){}