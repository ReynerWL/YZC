import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Psikolog } from './entities/psikolog.entity';
import { UsersService } from '#/users/users.service';
import { CreatePsikologDto } from './dto/create.psikolog.dto';
import { UpdatePsikolog } from './dto/update.psikolog.dto';

@Injectable()
export class PsikologService {
    constructor(
        @InjectRepository(Psikolog)
        private psikologRepository : Repository<Psikolog>,
        private userService: UsersService
    ){}

    findAll(){
        return this.psikologRepository.findAndCount({
            relations : {
                user : true 
            }
        });
    }

    async findOneById(id: string){
        try {
            return await this.psikologRepository.findOneOrFail({
                where : {id},
                relations : {user: true}
            })
        } catch (e) {
            if (e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "data not found",
                    },
                    HttpStatus.NOT_FOUND
                )
            }else {
                throw e
            }
        }
       }

       async create(CreatePsikologDto : CreatePsikologDto){
        try {
            // cek user id is valid
            const findOneUserId = await this.userService.findOne(CreatePsikologDto.user_id)
    
            //kalau valid kita baru create review
            const psikologEntity= new Psikolog
            psikologEntity.photo = CreatePsikologDto.photo
            psikologEntity.fullName = CreatePsikologDto.fullName
            psikologEntity.gender = CreatePsikologDto.gender
            psikologEntity.phone = CreatePsikologDto.phone
            psikologEntity.lastEducation = CreatePsikologDto.lastEducation
            psikologEntity.status = CreatePsikologDto.status
            psikologEntity.legality = CreatePsikologDto.legality
            psikologEntity.aboutMe = CreatePsikologDto.aboutMe
            psikologEntity.user = findOneUserId
    
            const insertReview =  await this.psikologRepository.insert(psikologEntity)
            return await this.psikologRepository.findOneOrFail({
            where: {
                id: insertReview.identifiers[0].id
            }
            })
        }catch (e) {
            throw e
        }
    }

    // async update(id: string, UpdatePsikologDto: UpdatePsikologDto){
    //     try {
    //         // cari idnya valid atau engga
    //         await this.findOneById(id)

    //         // kalau valid update datanya
    //         const psikologEntity = new Psikolog
    //         psikologEntity.fullName = CreatePsikologDto.fullName
    //         psikologEntity.gender = CreatePsikologDto.gender
    //         psikologEntity.phone = CreatePsikologDto.phone
    //         psikologEntity.lastEducation = CreatePsikologDto.lastEducation
    //         psikologEntity.status = CreatePsikologDto.status
    //         psikologEntity.legality = CreatePsikologDto.legality
    //         psikologEntity.aboutMe = CreatePsikologDto.aboutMe

    //         await this.psikologRepository.update(id, psikologEntity)

    //         //  return data setelah diupdate
    //         return await this.psikologRepository.findOneOrFail({
    //             where:{id}
    //         })
    //     } catch (e) {
    //         throw e
    //     }
    // }

    async softDeletedById(id: string){
        try {
            // cari dulu id valid ga
            await this.findOneById(id)

            //kalau nemu langsung delete
            await this.psikologRepository.softDelete(id)

            return "succes"
        } catch (e){
            throw e
        }
    }
}
