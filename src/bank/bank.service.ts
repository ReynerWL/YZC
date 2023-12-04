import { PsikologService } from '#/psikolog/psikolog.service';
import { UserYzcService } from '#/user_yzc/user_yzc.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';

@Injectable()
export class BankService {
    constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
    private psikologService: PsikologService,
    private userYzcService: UserYzcService
    ){}

 findAll(){
    return this.bankRepository.findAndCount({relations: {psikolog: true, userYzc: true}})
 }

 async createBank(createBankDto: CreateBankDto){
    try {
    
    } catch (error) {
        return error
    }
 }
}
