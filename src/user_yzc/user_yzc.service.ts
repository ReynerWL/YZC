import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserYzcDto } from './dto/create-user_yzc.dto';
import { UpdateUserYzcDto } from './dto/update-user_yzc.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User_Yzc } from './entities/user_yzc.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelUserService } from '#/level_user/level_user.service';

@Injectable()
export class UserYzcService {
  constructor(
    @InjectRepository(User_Yzc)
    private useryzcRepository: Repository<User_Yzc>,
    private leveluserService: LevelUserService ,
  ) {}

  findAll() {
    return this.useryzcRepository.findAndCount({relations:{level_user: true}});
  }

  async createUserYzc(createUserYzcDto: CreateUserYzcDto) {
    try {
      const findOneLevelUser = await this.leveluserService.findOne(createUserYzcDto.level_user)
     const useryzcEntity = new User_Yzc
     useryzcEntity.level_user = findOneLevelUser
     useryzcEntity.email = createUserYzcDto.email
     useryzcEntity.password = createUserYzcDto.password

     const insertUserYzc = await this.useryzcRepository.insert(useryzcEntity)
     return await this.useryzcRepository.findOneOrFail({
        where:{
            id: insertUserYzc.identifiers[0].id,
        }
     })
    } catch (error) {
        return error
    }
  }

  async findOne(id: string) {
    try {
      return await this.useryzcRepository.findOneOrFail({
        where: {id},relations: {level_user: true}
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async update(id: string, updateUserYzcDto: UpdateUserYzcDto) {
    try {
      await this.findOne(id)

      const useryzcEntity = new User_Yzc
      useryzcEntity.email = updateUserYzcDto.email
      useryzcEntity.password = updateUserYzcDto.password

      await this.useryzcRepository.update(id,useryzcEntity)
      return this.useryzcRepository.findOneOrFail({
        where: {id}
      })
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
}
  async deleteUserYzc(id: string) {
    try {
        await this.findOne(id)
        await this.useryzcRepository.softDelete(id)
        return `Delete Success`
    } catch (error) {
        throw error
    }
  }
}
