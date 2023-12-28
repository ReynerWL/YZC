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
    Req,
    UseInterceptors,
    UploadedFile,
    Res
  } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { CreateTransactionDto, CreateTransactionKonselingDto, CreateTransactionPsikologDto } from './dto/create-transaction.dto';
import { RejectTransactionDto, UpdateTransactionDto } from './dto/update-transaction.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageBuktiPembayaran } from './helper/upload-image';
import { of } from 'rxjs';
import { join } from 'path';

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

 @Get('/seminar')
 async findAllSeminar(){
    const [data,count] = await this.transactionService.findAllSeminar()
    return{
        data,count,status: HttpStatus.OK,message: 'Success'
    }
 }

 @Get('/seminar/approve')
 async findAllSeminarApprove(){
    const [data,count] = await this.transactionService.findAllSeminarApprove()
    return{
        data,count,status: HttpStatus.OK,message: 'Success'
    }
 }

 @Get('/seminar/reject')
 async findAllSeminarReject(){
    const [data,count] = await this.transactionService.findAllSeminarReject()
    return{
        data,count,status: HttpStatus.OK,message: 'Success'
    }
 }

 @Get('/seminar/pending')
 async findAllSeminarPending(){
    const [data,count] = await this.transactionService.findAllSeminarPending()
    return{
        data,count,status: HttpStatus.OK,message: 'Success'
    }
 }
 
 @Get('/private_konseling')
 async findAllPrivateKonseling(){
    const [data,count] = await this.transactionService.findAllPrivateKonseling()
    return{
        data,count,status: HttpStatus.OK,message: 'Success'
    }
 }

 @Get('CusToAd')
 async findAllCus(){
    const [data,count] = await this.transactionService.findAllCus()
    return{
        data,count,status: HttpStatus.OK,message: 'Success'
    }
 }

 @Get('AdToPsi')
 async findAllAdmin(){
    const [data,count] = await this.transactionService.findAllAdmin()
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

 @Get('detail/:id')
 async findDetailOrder(@Param('id', ParseUUIDPipe) id: string){
    return{
        data: await this.transactionService.findDetailOrderPsikolog(id),
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

 @Post('/psikolog')
 async createTransactionPsikolog(@Body() createTransactionPsikologDto: CreateTransactionPsikologDto){
    const data = await this.transactionService.createTransactionPsikolog(createTransactionPsikologDto)
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

 @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.transactionService.deleteTransaction(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

    @Put('reject/:id')
    async reject(@Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: RejectTransactionDto){
      return {
        data: await this.transactionService.reject(id, updateDto)
      }
    }

    @Put('approve/:id')
    async approve(@Param('id', ParseUUIDPipe) id: string,
    updateDto: UpdateTransactionDto){
      return {
        data: await this.transactionService.approve(id, updateDto)
      }
    }

    @Post('upload')
  @UseInterceptors(FileInterceptor('file', storageBuktiPembayaran))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (typeof file?.filename == "undefined") {
        return {
          statusCode: HttpStatus.BAD_REQUEST, 
          message: "error file cannot be upload"
        }
    } else {
        return {fileName: file?.filename}
    }
  }
  @Get('upload/:image/:type')
  getImage(
      @Param('image') imagePath: string,
      @Res() res: any,
  ) {
      return of(res.sendFile(join(process.cwd(), `upload/buktiPembayaran/${imagePath}`)));
  }
}
