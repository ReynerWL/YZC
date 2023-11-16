import { PartialType } from "@nestjs/mapped-types";
import { CreateLevelUserDto } from "./create-level_user.dto";

export class UpdateLevelUserDto extends PartialType(CreateLevelUserDto){}