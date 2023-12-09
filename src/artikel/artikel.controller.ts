import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  Delete
} from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { CreateArtikelDto } from './dto/create.artikel.dto';

@Controller('artikel')
export class ArtikelController {
  constructor(private ArtikelService: ArtikelService) { }

  @Get()
  async findAll() {
    const [data, count] = await this.ArtikelService.findAll()
    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'succes'
    }
  }

  @Post()
  async creatArtikel(@Body() createArtikelDto: CreateArtikelDto) {
    const data = await this.ArtikelService.createArtikel(
      createArtikelDto,
    );
    return {
      data,
      statusCode: HttpStatus.CREATED,
      message: 'Success',
    };
  }

}

