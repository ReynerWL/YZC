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
  } from '@nestjs/common';import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('bank')
export class BankController {
    constructor(
        private bankService: BankService
    ){}

    @Get()
    async findAll(){
        const [data,count] = await this.bankService.findAll()
        return{
            data,count,statusCode: HttpStatus.OK,message: 'Success'
        }
    }

    @Post('/user_yzc/bank')
    async createBankUser(@Body() createBankDto: CreateBankDto){
        const data = await this.bankService.createBankUser(createBankDto)
        return{
            data,statusCode: HttpStatus.CREATED,message: 'Success'
        }
    }

    @Post('/psikolog/bank')
    async createBankPsikolog(@Body() createBankDto: CreateBankDto){
        const data = await this.bankService.createBankPsikolog(createBankDto)
        return{
            data,statusCode: HttpStatus.CREATED,message: 'Success'
        }
    }
    
    @Get('/user_yzc/:id')
    async findOneUser(@Param('id', ParseUUIDPipe) id: string){
     return {
        data: await this.bankService.findOneUser(id),
        statusCode: HttpStatus.OK,
        message: 'Success'
     }
    }

    @Get('/psikolog/:id')
    async findOnePsikolog(@Param('id', ParseUUIDPipe) id: string){
     return {
        data: await this.bankService.findOnePsikolog(id),
        statusCode: HttpStatus.OK,
        message: 'Success'
     }
    }

    @Put('/user_yzc/:id')
    async updateUser(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateBankDto: UpdateBankDto,
    ) {
      return {
        data: await this.bankService.updateBankUser(id, updateBankDto),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

    @Put('/psikolog/:id')
    async updatePsikolog(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateBankDto: UpdateBankDto,
    ) {
      return {
        data: await this.bankService.updateBankPsikolog(id, updateBankDto),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

    @Delete('/user_yzc/:id')
    async removeUser(@Param('id', ParseUUIDPipe) id: string) {
      await this.bankService.deleteBankUser(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

    @Delete('/psikolog/:id')
    async removePsikolog(@Param('id', ParseUUIDPipe) id: string) {
      await this.bankService.deleteBankPsikolog(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

}
