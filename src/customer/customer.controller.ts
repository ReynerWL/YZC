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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerSevice: CustomerService ){}

    @Get()
    async findAll(){
      const [data,count] = await this.customerSevice.findAll()
      return{
        data,
        count,
        statusCode: HttpStatus.OK,
        message: 'success',
      }
    }

    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto) {
      const data = await this.customerSevice.create(createCustomerDto)
      return {
        data,
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    }
  
  
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      return {
        data: await this.customerSevice.findOne(id),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
      return {
        data: await this.customerSevice.update(id, updateCustomerDto),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.customerSevice.softDeletedById(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  }
