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
import { SeminarService } from './seminar.service';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { UpdateSeminarDto } from './dto/update-seminar.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageProfile } from '#/psikolog/helper/upload-profile-image';
import { storagePosterSeminar} from './helper/upload-image';
import { of } from 'rxjs';
import { join } from 'path';

@Controller('seminar')
export class SeminarController {
    constructor(private seminarService: SeminarService){}

    @Get()
    async findAll(){
        const [data,count] = await this.seminarService.findAll()
        return{
            data,count,
            status: HttpStatus.OK,
            message: 'success'
        }
    }

    @Get('approve')
    async findAllApprove(){
        const [data,count] = await this.seminarService.findAllApprove()
        return{
            data,count,
            status: HttpStatus.OK,
            message: 'success'
        }
    }

    @Get('reject')
    async findAllReject(){
        const [data,count] = await this.seminarService.findAllReject()
        return{
            data,count,
            status: HttpStatus.OK,
            message: 'success'
        }
    }
    @Get('pending')
    async findAllPending(){
        const [data,count] = await this.seminarService.findAllPending()
        return{
            data,count,
            status: HttpStatus.OK,
            message: 'success'
        }
    }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storagePosterSeminar))
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

    @Get('/psikolog/:id')
    async findAllByPsikolog(@Param('id', ParseUUIDPipe) id: string){
      const data = await this.seminarService.findAllByPsikolog(id)
      return{
        data,statusCode: HttpStatus.OK, message: 'Success'
      }
    }

    @Post()
    async create(@Body() createSeminarDto: CreateSeminarDto) {
      const data = await this.seminarService.createSeminar(createSeminarDto)
      return {
        data,
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    }
  
  
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      return {
        data: await this.seminarService.findOne(id),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateSeminarDto: UpdateSeminarDto
    ) {     
      return {
        data: await this.seminarService.update(id, updateSeminarDto, ),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.seminarService.deleteSeminar(id)
  
      return {
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

    @Put('reject/:id')
    async reject(@Param('id', ParseUUIDPipe) id: string,
    updateDto: UpdateSeminarDto){
      return {
        data: await this.seminarService.reject(id, updateDto)
      }
    }

    @Put('approve/:id')
    async approve(@Param('id', ParseUUIDPipe) id: string,
    updateDto: UpdateSeminarDto){
      return {
        data: await this.seminarService.approve(id, updateDto)
      }
    }

    @Get('upload/:image/:type')
  getImage(
      @Param('image') imagePath: string,
      @Res() res: any,
  ) {
      return of(res.sendFile(join(process.cwd(), `upload/posterSeminar/${imagePath}`)));
  }
}
