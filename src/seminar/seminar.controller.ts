import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    ParseUUIDPipe,
    HttpStatus,
  } from '@nestjs/common';
import { SeminarService } from './seminar.service';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { UpdateSeminarDto } from './dto/update-seminar.dto';

@Controller('seminar')
export class SeminarController {
    constructor(private seminarService: SeminarService){}

    @Get()
    async findAll(){
        const [data,count] = await this.seminarService.findAll()
        return{
            data,count,
            status: HttpStatus.OK,
            message: 'success'
        }
    }

    @Post()
    async create(@Body() createSeminarDto: CreateSeminarDto) {
      const data = await this.seminarService.createSeminar(createSeminarDto)
      return {
        data,
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    }
  
  
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      return {
        data: await this.seminarService.findOne(id),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateSeminarDto: UpdateSeminarDto,
    ) {
      return {
        data: await this.seminarService.update(id, updateSeminarDto),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.seminarService.deleteSeminar(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

    @Put()
    async reject(@Param('id', ParseUUIDPipe) id: string,
    updateDto: UpdateSeminarDto){
      return {
        data: await this.seminarService.reject(id, updateDto)
      }
    }

    @Put()
    async approve(@Param('id', ParseUUIDPipe) id: string,
    updateDto: UpdateSeminarDto){
      return {
        data: await this.seminarService.approve(id, updateDto)
      }
    }
}
