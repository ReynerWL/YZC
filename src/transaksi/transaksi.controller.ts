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
    Req
  } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { CreateTransactionDto, CreateTransactionKonselingDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaksi')
export class TransaksiController {
 constructor(private transactionService: TransaksiService){}

 @Get()
 async findAll(){
    const [data,count] = await this.transactionService.findAll()
    return{
        data,count,status: HttpStatus.OK,message: 'Success'
    }
 }

 @Get(':id')
 async findOne(@Param('id', ParseUUIDPipe) id: string){
    return{
        data: await this.transactionService.findOne(id),
        statusCode: HttpStatus.OK,
        message: 'Success'
    }
 }

 @Post('/seminar')
 async createTransaction(@Body() createTransactionDto: CreateTransactionDto){
    const data = await this.transactionService.createTransaction(createTransactionDto)
    return{
        data,statusCode: HttpStatus.CREATED,
        message: 'Success'
    }
 }

 @Post('/private_konseling')
 async createTransactionKonseling(@Body() createTransactionKonselingDto: CreateTransactionKonselingDto){
    const data = await this.transactionService.createTransactionKonseling(createTransactionKonselingDto)
    return{
        data,statusCode: HttpStatus.CREATED,
        message: 'Success'
    }
 }

 @Put('/seminar/:id')
 async updateTransaksi(@Param('id') id: string,@Body() updateTransactionDto: UpdateTransactionDto){
  return{
    data: await this.transactionService.update(id, updateTransactionDto),
    statusCode: HttpStatus.OK,
    message: 'Success'
  }
 }

 @Delete('/seminar/:id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.transactionService.deleteTransaction(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

    @Put()
    async reject(@Param('id', ParseUUIDPipe) id: string,
    updateDto: UpdateTransactionDto){
      return {
        data: await this.transactionService.reject(id, updateDto)
      }
    }

    @Put()
    async approve(@Param('id', ParseUUIDPipe) id: string,
    updateDto: UpdateTransactionDto){
      return {
        data: await this.transactionService.approve(id, updateDto)
      }
    }

}
