import { User_Yzc } from '#/user_yzc/entities/user_yzc.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { JwtStrategy } from './jwt.strategies.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User_Yzc)
        private useryzcRepository: Repository<User_Yzc>,
        private jwtService: JwtStrategy,
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
            throw error
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
                access_token: await this.jwtService.validate(payload)
            }
        } catch (error) {
            throw error
        }
    }
}
