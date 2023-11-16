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
import { LevelUserService } from './level_user.service';
import { CreateLevelUserDto } from './dto/create-level_user.dto';
import { UpdateLevelUserDto } from './dto/update-level_user.dto';

@Controller('level_user')
export class LevelUserController {
    constructor(private readonly leveluserService: LevelUserService){}

    @Get()
    async getFindAll(){
        const [data, count] = await this.leveluserService.findAll()
        return{
            data,count,statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Post()
    async create(@Body() createLevelUserDto: CreateLevelUserDto){
        const data = await this.leveluserService.create(createLevelUserDto)
        return{data, statusCode: HttpStatus.CREATED,message: "Success"}
    }

    @Get('/:id')
    async getDetailById(@Param('id', ParseUUIDPipe) id: string){
        return{
            data: await this.leveluserService.findOne(id),
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Put('/:id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateLevelUserDto: UpdateLevelUserDto
    ){
        return{
            data: await this.leveluserService.update(id, updateLevelUserDto),
            statusCode: HttpStatus.OK,
            message: "Success"
        }
    }

    @Delete('/:id')
    async deleteLevelUser(
        @Param('id', ParseUUIDPipe) id: string
    ){
        return{
            statusCode: HttpStatus.OK,
            message: await this.leveluserService.deleteLevelUser(id)
        }
    }
}
