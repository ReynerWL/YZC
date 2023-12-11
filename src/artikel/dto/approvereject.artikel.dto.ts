import { StatusArtikel } from "../entities/artikel.entity"
import { IsNotEmpty, IsString,} from "class-validator"

export class ApproveRejectArtikelDto{
    @IsString()
    alasan_tolak: string

    @IsNotEmpty()
    statusArtikel : StatusArtikel }
