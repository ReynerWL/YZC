import { IsNotEmpty } from "class-validator";

export class CreateLevelUserDto{
  @IsNotEmpty()
  name_level: string
}