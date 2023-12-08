import { StatusArtikel } from "../entities/artikel.entity"
import { IsNotEmpty } from "class-validator"
export class ApproveRejectDto{
    @IsNotEmpty()
    statusArtikel : StatusArtikel }