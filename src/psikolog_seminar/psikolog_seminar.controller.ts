import { Controller, Get, HttpStatus } from '@nestjs/common';
import { PsikologSeminarService } from './psikolog_seminar.service';

@Controller('psikolog-seminar')
export class PsikologSeminarController {
    constructor(private psikologSeminar: PsikologSeminarService){}

    @Get()
    async findAll(){
        const [data,count] = await this.psikologSeminar.findAll()
        return{
            data,count,
            status: HttpStatus.OK,
            message: 'success'
        }
    }
}
