import { Controller, Get, HttpStatus, Post, Put, Body, Param, ParseUUIDPipe, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { UpdateCustomerDto } from './dto/update.customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(
        private CustomerService: CustomerService
      ) { }
    
      @Get()
      async getAll() {
        const [data, count] = await this.CustomerService.findAll()
    
        return {
          data,
          count,
          statusCode: HttpStatus.OK,
          massage: "success"
        }
      }
    
      @Post()
      async create(@Body() createCustomerDto: CreateCustomerDto) {
        const data = await this.CustomerService.create(createCustomerDto)
    
        return {
          data,
          statusCode: HttpStatus.CREATED,
          message: "succes",
        }
      }
    
      @Put("/:id")
      async update(@Param("id", ParseUUIDPipe) id: string, @Body() UpdateCustomerDto: UpdateCustomerDto) {
        const data = await this.CustomerService.update(id, UpdateCustomerDto)
    
        return {
          data,
          StatusCode: HttpStatus.OK,
          message: "succes"
        }
      }
    
      @Delete("/:id")
      async softDelete(@Param("id", ParseUUIDPipe) id: string) {
        return {
          StatusCode: HttpStatus.OK,
          message: await this.CustomerService.softDeletedById(id)
        }
      }
}
