import {
    Controller,
    Get,
    HttpStatus,
    Post,
    Put,
    Body,
    Param,
    ParseUUIDPipe,
    Delete
} from '@nestjs/common';
import { ArtikelService } from './artikel.service';

@Controller('artikel')
export class ArtikelController {
        constructor(private ArtikelService: ArtikelService){}

        @Get()
        async findAll() {
          const [data,count] = await this.ArtikelService.findAll()
          return {
            data,
            count,
            statusCode: HttpStatus.OK,
            message:'succes'
          }
        }
    }

