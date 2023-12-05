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
import { NotifikasiService } from './notifikasi.service';
import { CreateNotifikasiDto } from './dto/create.notifikasi.dto';
import { UpdateNotifikasiDto } from './dto/update.notifikasi.dto';

@Controller('notifikasi')
export class NotifikasiController {
    constructor(private NotifikasiService: NotifikasiService) { }

    @Get()
    async findAll() {
        const [data, count] = await this.NotifikasiService.findAll()
        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            message: 'success',
        }
    }

    @Post()
    async create(@Body() createNotikasiDto: CreateNotifikasiDto) {
        const data = await this.NotifikasiService.createNotifikasi(createNotikasiDto)
        return {
            data,
            statusCode: HttpStatus.CREATED,
            message: 'success',
        };
    }         

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      return {
        data: await this.NotifikasiService.findOne(id),
        statusCode: HttpStatus.OK,
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
  
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.NotifikasiService.deleteNotifikasi(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

}
