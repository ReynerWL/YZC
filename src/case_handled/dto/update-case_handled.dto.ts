import { PartialType } from "@nestjs/mapped-types";
import { CreateCaseHandledDto } from "./create-case_handled.dto";

export class UpdateCaseHandledDto extends PartialType(CreateCaseHandledDto){

}