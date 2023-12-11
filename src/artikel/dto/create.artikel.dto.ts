import { IsNotEmpty } from "class-validator"

export class CreateArtikelDto {
    @IsNotEmpty()
    userYzc: string

    @IsNotEmpty()
    title : string

    @IsNotEmpty()
    articleContent : string

    @IsNotEmpty()
    imgThumbnail : string
}