import { UsersService } from '#/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level_User } from './entities/level_user.entity';

@Injectable()
export class LevelUserService {
    constructor(
        @InjectRepository(Level_User)
        private leveluserRepository: Repository<Level_User>,
        private userService: UsersService
    ){}
}
