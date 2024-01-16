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

    @Get('/seminar_rekomen')
    async seminarRekomen(){
        const data = await this.seminarService.seminarRekomen()
        return{
            data,
            status: HttpStatus.OK,
            message: 'success'
        }
    }
    @Get('approve/:id')
    async findAllApprovePsi(@Param('id', ParseUUIDPipe) id: string){
        const [data,count] = await this.seminarService.findAllApprovePsi(id)
        return{
            data,count,
            status: HttpStatus.OK,
            message: 'success'
        }
    }

    @Get('reject/:id')
    async findAllRejectPsi(@Param('id', ParseUUIDPipe) id: string){
        const [data,count] = await this.seminarService.findAllRejectPsi(id)
        return{
            data,count,
            status: HttpStatus.OK,
            message: 'success'
        }
    }
    @Get('pending/:id')
    async findAllPendingPsi(@Param('id', ParseUUIDPipe) id: string){
        const [data,count] = await this.seminarService.findAllPendingPsi(id)
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
    @Get('full')
    async findAllFull(){
        const [data,count] = await this.seminarService.findAllFull()
        return{
            data,count,
            status: HttpStatus.OK,
            message: 'success'
        }
    }
    @Get('done')
    async findAllDone(){
        const [data,count] = await this.seminarService.findAllDone()
        return{
            data,count,
            status: HttpStatus.OK,
            message: 'success'
        }
    }
    @Put('done/:id')
    async Done(@Param('id',ParseUUIDPipe) id: string){
        const data= await this.seminarService.done(id)
        return{
            data,
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

    @Get(':seminar/:id')
    async findOnePsi(@Param('id', ParseUUIDPipe) id: string, @Param('seminar', ParseUUIDPipe) seminar: string) {
      return {
        data: await this.seminarService.findOnePsi(id, seminar),
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
        data: await this.seminarService.update(id, updateSeminarDto),
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

    @Put('reject/:seminar/:id')
    async reject(@Param('id', ParseUUIDPipe) id: string,@Param('seminar', ParseUUIDPipe) seminar: string,@Body() updateDto: UpdateSeminarDto){
      return {
        data: await this.seminarService.reject(id, seminar,updateDto)
      }
    }

    @Put('approve/:seminar/:id')
    async approve(@Param('id', ParseUUIDPipe) id: string,@Param('seminar', ParseUUIDPipe) seminar: string){
      return {
        data: await this.seminarService.approve(id, seminar)
      }
    }

    @Put('approval/:id')
    async approvel(@Param('id', ParseUUIDPipe) id: string){
      return {
        data: await this.seminarService.approval(id)
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
