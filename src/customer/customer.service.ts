import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UserYzcService } from '#/user_yzc/user_yzc.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
        private useryzcService: UserYzcService,
    ){}
   
    findAll(){
        return this.customerRepository.findAndCount({relations: {user_yzc: true}})
    }

    async createCustomer(createCustomerDto: CreateCustomerDto){
        try {
            const findOneUserYzc = await this.useryzcService.findOne(createCustomerDto.user_yzc)
            const customerEntity = new Customer
            customerEntity.user_yzc = findOneUserYzc
            customerEntity.full_name = createCustomerDto.full_name
            customerEntity.birth_date = createCustomerDto.birth_date
            customerEntity.gender = createCustomerDto.gender
            customerEntity.religion = createCustomerDto.religion
            customerEntity.phone_number = createCustomerDto.phone_number
            customerEntity.last_education = createCustomerDto.last_education

            const insertCostumer = await this.customerRepository.insert(customerEntity)
            return await this.customerRepository.findOneOrFail({where:{id: insertCostumer.identifiers[0].id}})
        } catch (error) {
            return error
        }
    }

    async findOne(id: string){
        try {
            return await this.customerRepository.findOneOrFail({where:{id}, relations: {user_yzc: true}})
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                    {statusCode: HttpStatus.NOT_FOUND,error: 'Data Not Found'},
                    HttpStatus.NOT_FOUND,
                )
            } else {
                throw error
            }
        }
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto) {
        try {
          await this.findOne(id)
    
          const customerEntity = new Customer
            customerEntity.full_name = updateCustomerDto.full_name
            customerEntity.birth_date = updateCustomerDto.birth_date
            customerEntity.phone_number = updateCustomerDto.phone_number
            customerEntity.last_education = updateCustomerDto.last_education
    
          await this.customerRepository.update(id,customerEntity)
          return this.customerRepository.findOneOrFail({
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
      async deleteCustomer(id: string) {
        try {
            await this.findOne(id)
            await this.customerRepository.softDelete(id)
            return `Delete Success`
        } catch (error) {
            throw error
        }
      }
}
