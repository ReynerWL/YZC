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
import { CaseHandledService } from './case_handled.service';
import { CreateCaseHandledDto } from './dto/create-case_handled.dto';
import { UpdateCaseHandledDto } from './dto/update-case_handled.dto';

@Controller('case-handled')
export class CaseHandledController {
  constructor(private caseHandledService: CaseHandledService){}

  @Get()
  async findAll(){
    const [data,count] = await this.caseHandledService.findAll()
    return{
      data,count,statusCode: HttpStatus.OK,
      message: 'Success'
    }
  }

  @Post()
  async create(@Body() createCaseHandledDto: CreateCaseHandledDto){
   const data = await this.caseHandledService.createCaseHandled(createCaseHandledDto)
   return{
    data,statusCode: HttpStatus.CREATED,message: 'Success'
   }
  }

  @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      return {
        data: await this.caseHandledService.findOne(id),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateCaseHandledDto: UpdateCaseHandledDto,
    ) {
      return {
        data: await this.caseHandledService.update(id, updateCaseHandledDto),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.caseHandledService.deleteCase(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
}
