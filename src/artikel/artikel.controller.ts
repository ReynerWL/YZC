import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  Delete,
  Query
} from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { CreateArtikelDto } from './dto/create.artikel.dto';
import { UpdateArtikelDto } from './dto/update.artikel.dto';
import { ApproveRejectArtikelDto } from './dto/approvereject.artikel.dto';

@Controller('artikel')
export class ArtikelController {
  constructor(private ArtikelService: ArtikelService) { }

  @Get('/approve')
  async Approve(@Query('status') status: string) {
    const data = await this.ArtikelService.findArtikelApprove(status);
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  @Put('/reject/:id')
  async reject(@Param('id', ParseUUIDPipe) id: string, @Body() approveRejectDto: ApproveRejectArtikelDto) {
    const data = await this.ArtikelService.findArtikelreject(id, approveRejectDto)
    return {
      data,
      statusCode: HttpStatus.OK,
      message: "Success"
    }
  }

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

  @Get('/:id')
  async getArtikelById(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.ArtikelService.findArtikelById(id),
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
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

  @Get('/list-artikel-byautor/:id')
  async getListartikelByAutor(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.ArtikelService.findListartikelByAutor(id),
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }


  @Put('/:id')
  async updateArtikel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtikelDto: UpdateArtikelDto,
  ) {
    return {
      data: await this.ArtikelService.updateArtikel(id, updateArtikelDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put('/status-artikel/:id')
  async updateStatusArtikel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusArtikelDto: ApproveRejectArtikelDto,
  ) {
    const data = await this.ArtikelService.approveRejectArtikel(
      id,
      updateStatusArtikelDto,
    );
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  @Delete("/:id")
  async softDelete(@Param("id", ParseUUIDPipe) id: string) {
    return {
      StatusCode: HttpStatus.OK,
      message: await this.ArtikelService.softDeletedById(id)
    }
  }

}

