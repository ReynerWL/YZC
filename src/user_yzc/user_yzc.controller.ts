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
  import { UserYzcService } from './user_yzc.service';
  import { CreateUserYzcDto } from './dto/create-user_yzc.dto';
  import { UpdateUserYzcDto } from './dto/update-user_yzc.dto';
  
  @Controller('users')
  export class UserYzcController {
    constructor(private readonly useryzcService: UserYzcService) {}
  
    @Post()
    async create(@Body() createUserYzcDto: CreateUserYzcDto) {
      return {
        data: await this.useryzcService.create(createUserYzcDto),
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    }
  
    @Get()
    async findAll() {
      const [data, count] = await this.useryzcService.findAll();
  
      return {
        data,
        count,
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      return {
        data: await this.useryzcService.findOne(id),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateUserYzcDto: UpdateUserYzcDto,
    ) {
      return {
        data: await this.useryzcService.update(id, updateUserYzcDto),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.useryzcService.deleteUserYzc(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  }
  