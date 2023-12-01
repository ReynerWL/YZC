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
    Query
  } from '@nestjs/common';import { OrderService } from './order.service';
import { CreateOrderYzcDto } from './dto/create-order.dto';
import UpdateOrderYzcDto from './dto/update-order.dto';

@Controller('order')
export class OrderController {
    constructor(
    private readonly orderYzcService: OrderService
    ){}

    @Get()
    async findAll(){
        const [data,count] = await this.orderYzcService.findAll()
        return{
            data,
            count,
            statusCode: HttpStatus.OK,
            message: 'success',
          }
    }

    @Post('/order/seminar')
    async createSeminar(@Query('seminar') seminar: string, @Body() createOrderYzcDto: CreateOrderYzcDto){
     const data = await this.orderYzcService.createOrderSeminar({...createOrderYzcDto, seminar})
     return {data,statusCode: HttpStatus.CREATED,message: "Success"}
    }
    @Post('/order/private_konseling')
    async createPrivatekonseling(@Query('private_konseling') private_konseling: string, @Body() createOrderYzcDto: CreateOrderYzcDto){
     const data = await this.orderYzcService.createOrderPrivateKonseling({...createOrderYzcDto, private_konseling})
     return {data,statusCode: HttpStatus.CREATED,message: "Success"}
    }

    @Put(':id')
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateOrderYzcDto: UpdateOrderYzcDto,
    ) {
      return {
        data: await this.orderYzcService.update(id, updateOrderYzcDto),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.orderYzcService.deleteOrder(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
}
