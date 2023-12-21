import { Controller, Get, HttpStatus, Post, Put, Body, Param, ParseUUIDPipe, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { PsikologService } from './psikolog.service';
import { CreatePsikologDto } from './dto/create.psikolog.dto';
import { UpdatePsikologDto } from './dto/update.psikolog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { of } from 'rxjs';
import { storageProfile } from './helper/upload-profile-image';
import { storageLegality } from './helper/upload-legality-image';


@Controller('psikolog')
export class PsikologController {
  constructor(
    private psikologService: PsikologService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storageProfile))
  uploadProfile(@UploadedFile() file: Express.Multer.File) {
    if (typeof file?.filename == "undefined") {
        return {
          statusCode: HttpStatus.BAD_REQUEST, 
          message: "error file cannot be upload"
        }
    } else {
        return {fileName: file?.filename}
    }
  }

  @Post('upload/legality')
  @UseInterceptors(FileInterceptor('file', storageLegality))
  uploadLegality(@UploadedFile() file: Express.Multer.File) {
    if (typeof file?.filename == "undefined") {
        return {
          statusCode: HttpStatus.BAD_REQUEST, 
          message: "error file cannot be upload"
        }
    } else {
        return {fileName: file?.filename}
    }
  }

  @Get()
  async getAll() {
    const [data, count] = await this.psikologService.findAll()

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      massage: "success"
    }
  }

  @Post()
  async create(@Body() createPsikologDto: CreatePsikologDto) {
    const data = await this.psikologService.create(createPsikologDto)

    return {
      data,
      statusCode: HttpStatus.CREATED,
      message: "succes",
    }
  }

  @Put("/:id")
  async update(@Param("id", ParseUUIDPipe) id: string, @Body() UpdatePsikologDto: UpdatePsikologDto) {
    const data = await this.psikologService.update(id, UpdatePsikologDto)

    return {
      data,
      StatusCode: HttpStatus.OK,
      message: "succes"
    }
  }


  @Delete("/:id")
  async softDelete(@Param("id", ParseUUIDPipe) id: string) {
    return {
      StatusCode: HttpStatus.OK,
      message: await this.psikologService.softDeletedById(id)
    }
  }

  @Get('upload/:image/:type')
    getImage(
        @Param('type') type: string,
        @Param('image') imagePath: string,
        @Res() res: any,
    ) {
        return of(res.sendFile(join(process.cwd(), `upload/profile/${imagePath}`)));
    }

}