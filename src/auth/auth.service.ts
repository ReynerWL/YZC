import { User_Yzc } from '#/user_yzc/entities/user_yzc.entity';
import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { EntityNotFoundError, Repository } from 'typeorm';
import { RegisterDto, RegisterPsikologDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { Customer } from '#/customer/entities/customer.entity';
import { Psikolog } from '#/psikolog/entities/psikolog.entity';
import { LevelUserService } from '#/level_user/level_user.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User_Yzc)
        private useryzcRepository: Repository<User_Yzc>,

        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,

        @InjectRepository(Psikolog)
        private psikologRepository: Repository<Psikolog>,

        private levelUserService: LevelUserService,
        private jwtService: JwtService,
    ){}

    async register(registerDto: RegisterDto){

        try {
  
          const findLevelUser = await this.levelUserService.findOne(registerDto.level_user)
          const levelUser : any = findLevelUser.id
          let Status : any = 'active'
          

            const saltGenerator = await bcrypt.genSalt()
            const password = registerDto.password
            const hash = await bcrypt.hash(password, saltGenerator)

            const user_yzc = new User_Yzc
            user_yzc.email = registerDto.email
            user_yzc.salt = saltGenerator
            user_yzc.password = hash
            user_yzc.status = Status
            user_yzc.level_user = levelUser
            const createUserYzc = await this.useryzcRepository.insert(user_yzc)

              const customerEntity = new Customer()
            customerEntity.user_yzc = createUserYzc.identifiers[0].id
            customerEntity.full_name = registerDto.full_name
            customerEntity.birth_date =registerDto.birth_date
            customerEntity.gender = registerDto.gender
            customerEntity.religion = registerDto.religion
            customerEntity.phone_number = registerDto.phone_number
            customerEntity.last_education = registerDto.last_education

            const createCustomer = await this.customerRepository.insert(customerEntity)

            return( this.useryzcRepository.findOneOrFail({
              where: {id: createUserYzc.identifiers[0].id}
          }),
           this.customerRepository.findOneOrFail({
            where: {id: createCustomer.identifiers[0].id}
           }))
              
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                  {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'data not found',
                  },
                  HttpStatus.NOT_FOUND,
                );
              } else {
                throw error;
              }
        }
    }

    async registerPsikolog(registerPsikologDto: RegisterPsikologDto){

      try {
        const findLevelUser = await this.levelUserService.findOne(registerPsikologDto.level_user)
        const levelUser : any = findLevelUser.id
        let Status : any = 'pending'
        
          const saltGenerator = await bcrypt.genSalt()
          const password = registerPsikologDto.password
          const hash = await bcrypt.hash(password, saltGenerator)

          const user_yzc = new User_Yzc
          user_yzc.email = registerPsikologDto.email
          user_yzc.salt = saltGenerator
          user_yzc.password = hash
          user_yzc.status = Status
          user_yzc.level_user = levelUser
          const createUserYzc = await this.useryzcRepository.insert(user_yzc)
          
            const psikologEntity = new Psikolog()
            psikologEntity.user_yzc = createUserYzc.identifiers[0].id
            psikologEntity.photo = registerPsikologDto.photo
            psikologEntity.fullName = registerPsikologDto.full_name
            psikologEntity.gender = registerPsikologDto.gender
            psikologEntity.lastEducation = registerPsikologDto.last_education
            psikologEntity.legality = registerPsikologDto.legality
            psikologEntity.aboutMe = registerPsikologDto.aboutMe

          const createCustomer = await this.psikologRepository.insert(psikologEntity)

          return( this.useryzcRepository.findOneOrFail({
            where: {id: createUserYzc.identifiers[0].id}
        }),
         this.psikologRepository.findOneOrFail({
          where: {id: createCustomer.identifiers[0].id}
         }))
            
      } catch (error) {
          if (error instanceof EntityNotFoundError) {
              throw new HttpException(
                {
                  statusCode: HttpStatus.NOT_FOUND,
                  message: 'data not found',
                },
                HttpStatus.NOT_FOUND,
              );
            } else {
              throw error;
            }
      }
  }

    async login(loginDto: LoginDto){
        try {
            const useryzcOne = await this.useryzcRepository.findOne({
                where: {email: loginDto.email}
            })
            if (!useryzcOne) {
             throw new HttpException(
                {
                statusCode: HttpStatus.BAD_REQUEST,
                error: 'Username Is Invalid',
                },HttpStatus.BAD_REQUEST
             )
            }

            const isMatch = await bcrypt.compare(loginDto.password, useryzcOne.password)
            if (!isMatch) {
             throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  error: 'Password Is Invalid',
                },HttpStatus.BAD_REQUEST,
             )
            }

            const payload = {
                id: useryzcOne.id,
                email: useryzcOne.email,
            }

            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            throw new HttpException(
                {
                  statusCode: HttpStatus.UNAUTHORIZED,
                  message: 'Invalid credential',
                },
                HttpStatus.UNAUTHORIZED,
              );
        }
    }
}
