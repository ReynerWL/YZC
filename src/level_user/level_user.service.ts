import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository, UpdateEvent } from 'typeorm';
import { Level_User } from './entities/level_user.entity';
import { CreateLevelUserDto } from './dto/create-level_user.dto';
import { UpdateLevelUserDto } from './dto/update-level_user.dto';

@Injectable()
export class LevelUserService {
    constructor(
        @InjectRepository(Level_User)
        private leveluserRepository: Repository<Level_User>,
    ){}

    findAll(){
        return this.leveluserRepository.findAndCount();
    }

    async create(createLevelUserDto: CreateLevelUserDto){
        try {
            const leveluserentity = new Level_User
            leveluserentity.name_level = createLevelUserDto.name_level
            
            const insertLevelUser = await this.leveluserRepository.insert(leveluserentity)
            return await this.leveluserRepository.findOneOrFail({
                where: {
                    id: insertLevelUser.identifiers[0].id
                }
            })
        } catch (error) {
            return error
        }
    }

    async findOne(id: string){
        try {
         return await this.leveluserRepository.findOneOrFail({where: {id}})
        } catch (error) {
        if (error instanceof EntityNotFoundError) {
            throw new HttpException(
               { statusCode: HttpStatus.NOT_FOUND,
                error: "Data not Found"},
                HttpStatus.NOT_FOUND
            )
        } else {
            throw error
        }
        }
    }

    async update(id: string, updateLevelUserDto: UpdateLevelUserDto){
        try {
            await this.findOne(id)

            const reviewEntity = new Level_User
            reviewEntity.name_level = updateLevelUserDto.name_level

            await this.leveluserRepository.update(id, reviewEntity)
            return this.leveluserRepository.findOneOrFail({where: {id}})
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'Data not Found'
                },
                HttpStatus.NOT_FOUND
                )
            } else {
                throw error
            }
        }
    }

    async deleteLevelUser(id: string){
        try {
            await this.findOne(id)
            await this.leveluserRepository.softDelete(id)
            return `Delete Success`
        } catch (error) {
            throw error
        }
    }
}
