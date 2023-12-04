import { User_Yzc } from '#/user_yzc/entities/user_yzc.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { EntityNotFoundError, Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User_Yzc)
        private useryzcRepository: Repository<User_Yzc>,
        private jwtService: JwtService,
    ){}

    async register(registerDto: RegisterDto){
        try {
            const saltGenerator = await bcrypt.genSalt()

            const password = registerDto.password
            const hash = await bcrypt.hash(password, saltGenerator)

            const user_yzc = new User_Yzc
            user_yzc.email = registerDto.email
            user_yzc.salt = saltGenerator
            user_yzc.password = hash

            const createUserYzc = await this.useryzcRepository.insert(user_yzc)

            return await this.useryzcRepository.findOneOrFail({
                where: {id: createUserYzc.identifiers[0].id}
            })
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
