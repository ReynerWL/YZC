import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { UserYzcService } from '#/user_yzc/user_yzc.service';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { UpdateCustomerDto } from './dto/update.customer.dto';
import { Psikolog } from '#/psikolog/entities/psikolog.entity';
import { createConnection } from 'net';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) { }

    findAll() {
        return this.customerRepository.findAndCount({
            relations: {
                user_yzc: true,
            },
        });
    }

    async findOne(id: string) {
        try {
            return await this.customerRepository.findOneOrFail({
                where: { id },
                relations: { user_yzc: true }
            })
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "data not found",
                    },
                    HttpStatus.NOT_FOUND
                )
            } else {
                throw e
            }
        }
    }

    async create(createcustomerDto: CreateCustomerDto) {
        try {
            // cek user id is valid

            //kalau valid kita baru create review
            const customerEntity = new Customer
            customerEntity.fullName = createcustomerDto.fullName
            customerEntity.birthDate = createcustomerDto.birthDate
            customerEntity.gender = createcustomerDto.gender
            customerEntity.religion = createcustomerDto.Religion
            customerEntity.phone = createcustomerDto.phone
            customerEntity.last_education = createcustomerDto.lastEducation

            const insertReview = await this.customerRepository.insert(customerEntity)
            return await this.customerRepository.findOneOrFail({
                where: {
                    id: insertReview.identifiers[0].id
                }
            })
        } catch (e) {
            throw e
        }
    }

    async update(id: string, updatecustomerDto: UpdateCustomerDto) {
        try {
            // cari idnya valid atau engga
            await this.findOne(id)

            //kalau valid update datanya
            const customerEntity = new Customer
            customerEntity.fullName = updatecustomerDto.fullName
            customerEntity.birthDate = updatecustomerDto.birthDate
            customerEntity.gender = updatecustomerDto.gender
            customerEntity.religion = updatecustomerDto.Religion
            customerEntity.phone = updatecustomerDto.phone
            customerEntity.last_education = updatecustomerDto.lastEducation

            await this.customerRepository.update(id, customerEntity)

            // return data setelah diupdate
            return await this.customerRepository.findOneOrFail({
                where: { id }
            })
        } catch (e) {
            throw e
        }
    }

    async softDeletedById(id: string) {
        try {
            // cari dulu id valid ga
            await this.findOne(id)

            //kalau nemu langsung delete
            await this.customerRepository.softDelete(id)

            return "succes"
        } catch (e) {
            throw e
        }
    }

}
