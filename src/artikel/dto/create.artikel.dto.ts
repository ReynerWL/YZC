import { IsNotEmpty } from "class-validator"

export class CreateArtikelDto {
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