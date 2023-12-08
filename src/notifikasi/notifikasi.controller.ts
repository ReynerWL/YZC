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

 
  @Get('/all')
  async getAllNotif() {
    const [data, count] = await this.NotifikasiService.findAll()
    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    }
  }

  @Get('/:id')
  async getNotifById(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.NotifikasiService.findNotifById(id),
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

  @Get('/unread')
  async getNotifUnread(@Query('status') status: string) {
    const data = await this.NotifikasiService.findNotifUnread(status);
    return {
      data,
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }

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

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNotifikasiDto: UpdateNotifikasiDto,
  ) {
    return {
      data: await this.NotifikasiService.update(id, updateNotifikasiDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
  
}
