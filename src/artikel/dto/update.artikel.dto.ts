import { PartialType } from "@nestjs/mapped-types";
import { CreateArtikelDto } from "./create.artikel.dto";
import { IsNotEmpty } from "class-validator";


export class UpdateArtikelDto extends PartialType(CreateArtikelDto){
    @IsNotEmpty()
    customer: string

    @IsNotEmpty()
    psikolog: string

    @IsNotEmpty()
    title : string

    @IsNotEmpty()
    articleContent : string

    @IsNotEmpty()
    imgThumbnail : string
}