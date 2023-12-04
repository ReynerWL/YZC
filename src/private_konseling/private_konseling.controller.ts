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
import { PrivateKonselingService } from './private_konseling.service';
import { CreatePrivateKonselingDto } from './dto/create-private_konseling.dto';
import { UpdatePrivateKonselingDto } from './dto/update-private_konseling.dto';

@Controller('private_konseling')
export class PrivateKonselingController {
  constructor(private privateKonselingService: PrivateKonselingService){}

  @Get()
    async findAll(){
      const [data,count] = await this.privateKonselingService.findAll()
      return{
        data,
        count,
        statusCode: HttpStatus.OK,
        message: 'success',
      }
    }

    @Post()
    async create(@Body() createPrivateKonselingDto: CreatePrivateKonselingDto) {
      const data = await this.privateKonselingService.createPrivateKonseling(createPrivateKonselingDto)
      return {
        data,
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    }
  
  
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      return {
        data: await this.privateKonselingService.findOne(id),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updatePrivateKonselingDto: UpdatePrivateKonselingDto,
    ) {
      return {
        data: await this.privateKonselingService.update(id, updatePrivateKonselingDto),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.privateKonselingService.deletePrivateKonseling(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

    @Put()
    async reject(@Param('id', ParseUUIDPipe) id: string,
    updateDto: UpdatePrivateKonselingDto){
      return {
        data: await this.privateKonselingService.reject(id, updateDto)
      }
    }

    @Put()
    async approve(@Param('id', ParseUUIDPipe) id: string,
    updateDto: UpdatePrivateKonselingDto){
      return {
        data: await this.privateKonselingService.approve(id, updateDto)
      }
    }
}
