import { IsNotEmpty } from "class-validator"

export class CreateArtikelDto {
    @IsNotEmpty()
    admin: string

    @IsNotEmpty()
    psikolog: string

    @IsNotEmpty()
    title : string

    @IsNotEmpty()
    articleContent : string

    @IsNotEmpty()
    imgThumbnail : string

    alasan: string
}