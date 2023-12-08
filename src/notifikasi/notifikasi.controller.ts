import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
  Delete
} from '@nestjs/common';
import { NotifikasiService } from './notifikasi.service';
import { CreateNotifikasiDto } from './dto/create.notifikasi.dto';
import { UpdateNotifikasiDto } from './dto/update.notifikasi.dto';

@Controller('notifikasi')
export class NotifikasiController {
  constructor(private NotifikasiService: NotifikasiService) { }


  @Post('/create')
  async create(@Body() createNotikasiDto: CreateNotifikasiDto) {
    const data = await this.NotifikasiService.createNotifikasi(createNotikasiDto)
    // console.log(CreateNotifikasiDto, "ada ga cuy")
    return {
      data,
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

}
