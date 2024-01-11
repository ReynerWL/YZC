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

    @Get('/pending/:id')
    async findAllPsiPending(@Param('id', ParseUUIDPipe) id: string){
      const [data,count] = await this.privateKonselingService.findAllPsiPending(id)
      return{
        data,
        count,
        statusCode: HttpStatus.OK,
        message: 'success',
      }
    }

    @Get('/approve/:id')
    async findAllPsiAppprove(@Param('id', ParseUUIDPipe) id: string){
      const [data,count] = await this.privateKonselingService.findAllPsiApprove(id)
      return{
        data,
        count,
        statusCode: HttpStatus.OK,
        message: 'success',
      }
    }

    @Get('/reject/:id')
    async findAllPsiReject(@Param('id', ParseUUIDPipe) id: string){
      const [data,count] = await this.privateKonselingService.findAllPsiReject(id)
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

    @Put('/reject/:id')
    async reject(@Param('id', ParseUUIDPipe) id: string,@Body()
    updateDto: UpdatePrivateKonselingDto){
      return {
        data: await this.privateKonselingService.reject(id, updateDto)
      }
    }

    @Put('/approve/:id')
    async approve(@Param('id', ParseUUIDPipe) id: string){
      return {
        data: await this.privateKonselingService.approve(id)
      }
    }
}
