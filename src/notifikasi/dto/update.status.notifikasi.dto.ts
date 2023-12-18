import { StatusNotifikasi } from "../entities/notifikasi.entity"
import { IsNotEmpty } from "class-validator"

export class UpdateStatusNotifikasiDto{
    @IsNotEmpty()
    statusNotifikasi : StatusNotifikasi }