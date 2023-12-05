import { PartialType } from "@nestjs/mapped-types";
import { CreateNotifikasiDto } from "./create.notifikasi.dto";
import { IsNotEmpty, IsEnum} from "class-validator";
import { StatusNotifikasi } from "../entities/notifikasi.entity";

export class UpdateNotifikasiDto extends PartialType(CreateNotifikasiDto){
    @IsNotEmpty()
    customer: string;

    @IsNotEmpty()
    psikolog: string;

    @IsNotEmpty()
    @IsEnum(StatusNotifikasi)
    statusNotifikasi: StatusNotifikasi
    
    @IsNotEmpty()
    notificationContent: string;
}