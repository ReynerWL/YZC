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
  Query,
  UseInterceptors,
  UploadedFile,
  Res
} from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { CreateArtikelDto } from './dto/create.artikel.dto';
import { UpdateArtikelDto } from './dto/update.artikel.dto';
import { ApproveRejectArtikelDto } from './dto/approvereject.artikel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageProfile } from '#/psikolog/helper/upload-profile-image';
import { storageThumbnailArtikel } from './helper/upload-thumbnail-image';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('artikel')
export class ArtikelController {
  constructor(private ArtikelService: ArtikelService) { }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', storageThumbnailArtikel))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   if (typeof file?.filename == "undefined") {
  //       return {
  //         statusCode: HttpStatus.BAD_REQUEST, 
  //         message: "error file cannot be upload"
  //       }
  //   } else {
  //       return {fileName: file?.filename}
  //   }
  // }

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

  @Get('/list-artikel-byautor/:id')
  async getListartikelByAutor(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.ArtikelService.findListartikelByAutor(id),
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
  ) {
    const data = await this.ArtikelService.approveRejectArtikel(
      id
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

  @Get('upload/:image/:type')
  getImage(
      @Param('type') type: string,
      @Param('image') imagePath: string,
      @Res() res: any,
  ) {
      return of(res.sendFile(join(process.cwd(), `upload/thumbnailArtikel/${imagePath}`)));
  }

}