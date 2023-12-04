import { Controller, Get, HttpStatus, Post, Put, Body, Param, ParseUUIDPipe, Delete } from '@nestjs/common';
import { PsikologService } from './psikolog.service';
import { CreatePsikologDto } from './dto/create.psikolog.dto';
import { UpdatePsikologDto } from './dto/update.psikolog.dto';

@Controller('psikolog')
export class PsikologController {
  constructor(
    private psikologService: PsikologService
  ) { }

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
}