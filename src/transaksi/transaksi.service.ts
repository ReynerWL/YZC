import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status, Transaction, Type } from './entities/transaction.entity';
import { StatusPK } from '#/private_konseling/entities/private_konseling.entity';
import {
  Between,
  EntityNotFoundError,
  Repository,
  getRepository,
} from 'typeorm';
import {
  DetailOrder,
  types,
} from '#/detail_order/entities/detail_order.entity';
import { CustomerService } from '#/customer/customer.service';
import { SeminarService } from '#/seminar/seminar.service';
import { BankService } from '#/bank/bank.service';
import {
  CreateTransactionDto,
  CreateTransactionKonselingDto,
  CreateTransactionPsikologDto,
} from './dto/create-transaction.dto';
import { PrivateKonselingService } from '#/private_konseling/private_konseling.service';
import {
  RejectTransactionDto,
  UpdateTransactionDto,
  UpdateTransactionKonselingDto,
} from './dto/update-transaction.dto';
import { PsikologService } from '#/psikolog/psikolog.service';
import { PrivateKonseling } from '#/private_konseling/entities/private_konseling.entity';
import { Seminar } from '#/seminar/entities/seminar.entity';
// import puppeteer from 'puppeteer';
import { ArrayNotEmpty } from 'class-validator';
import { Psikolog } from '#/psikolog/entities/psikolog.entity';
import { PsikologSeminar } from '#/psikolog_seminar/entities/psikolog_seminar.entity';

@Injectable()
export class TransaksiService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(DetailOrder)
    private detailOrderRepository: Repository<DetailOrder>,
    @InjectRepository(PrivateKonseling)
    private privateKonselingRepository: Repository<PrivateKonseling>,

    private customerService: CustomerService,
    private psikologService: PsikologService,
    private seminarService: SeminarService,
    private privateKonselingService: PrivateKonselingService,
    private bankService: BankService,
  ) {}

  findAll() {
    return this.transactionRepository.findAndCount({
      relations: {
        customer: true,
        detailOrder: { seminar: true, privateKonseling: {psikolog: true} },
        bank: true,
      },
    });
  }

  async findAllApprove(id: string) {
    const customer = await this.customerService.findOne(id);
    return this.transactionRepository.findAndCount({
      relations: {
        customer: true,
        detailOrder: { seminar: true, privateKonseling: true },
        bank: true,
      },
      where: {
        status: Status.Approve,
        type: Type.CusToAdmin,
        customer: { id: customer.id },
      },
    });
  }

  async findAllReject(id: string) {
    const customer = await this.customerService.findOne(id);
    return this.transactionRepository.findAndCount({
      relations: {
        customer: true,
        detailOrder: { seminar: true, privateKonseling: true },
        bank: true,
      },
      where: {
        status: Status.Reject,
        type: Type.CusToAdmin,
        customer: { id: customer.id },
      },
    });
  }

  async findAllPending(id: string) {
    const customer = await this.customerService.findOne(id);
    return this.transactionRepository.findAndCount({
      relations: {
        customer: true,
        detailOrder: { seminar: true, privateKonseling: true },
        bank: true,
      },
      where: {
        status: Status.Pending,
        type: Type.CusToAdmin,
        customer: { id: customer.id },
      },
    });
  }

  findAllSeminar() {
    return this.transactionRepository.findAndCount({
      where: { detailOrder: { types: types.Seminar } },
      relations: {
        customer: true,
        detailOrder: { seminar: true },
      },
    });
  }

  findAllSeminarApprove() {
    return this.transactionRepository.findAndCount({
      where: { detailOrder: { types: types.Seminar }, status: Status.Approve },
      relations: {
        customer: true,
        detailOrder: { seminar: true },
      },
    });
  }

  findAllSeminarReject() {
    return this.transactionRepository.findAndCount({
      where: { detailOrder: { types: types.Seminar }, status: Status.Reject },
      relations: {
        customer: true,
        detailOrder: { seminar: true },
      },
    });
  }

  findAllSeminarPending() {
    return this.transactionRepository.findAndCount({
      where: { detailOrder: { types: types.Seminar }, status: Status.Pending },
      relations: {
        customer: true,
        detailOrder: { seminar: true },
      },
    });
  }

  findAllPrivateKonseling() {
    return this.transactionRepository.findAndCount({
      where: { detailOrder: { types: types.Private_Konseling } },
      relations: {
        customer: true,
        detailOrder: { privateKonseling: true },
      },
    });
  }

  findAllPrivateKonselingPending() {
    return this.transactionRepository.findAndCount({
      where: { detailOrder: { types: types.Private_Konseling ,privateKonseling: {status: StatusPK.Approve}} },
      relations: {
        customer: true,
        detailOrder: { privateKonseling: true },
      },
    });
  }
  findAllPrivateKonselingApprove() {
    return this.transactionRepository.findAndCount({
      where: { detailOrder: { types: types.Private_Konseling,privateKonseling: {status: StatusPK.Approve} } },
      relations: {
        customer: true,
        detailOrder: { privateKonseling: true },
      },
    });
  }
  findAllPrivateKonselingReject() {
    return this.transactionRepository.findAndCount({
      where: { detailOrder: { types: types.Private_Konseling ,privateKonseling: {status: StatusPK.Reject}} },
      relations: {
        customer: true,
        detailOrder: { privateKonseling: true },
      },
    });
  }

  findAllCus() {
    return this.transactionRepository.findAndCount({
      where: { type: Type.CusToAdmin },
      relations: {
        customer: true,
        detailOrder: { seminar: true, privateKonseling: true },
      },
    });
  }
  findAllAdmin() {
    return this.transactionRepository.findAndCount({
      where: { type: Type.AdminToPsi },
      relations: {
        psikolog: true,
        detailOrder: true,
      },
    });
  }

  async findAllApprovePsi(id: string) {
    const psikolog = await this.psikologService.findOne(id);
    return this.transactionRepository.find({
      relations: {
        psikolog: true,
        bank: true,
      },
      where: {
        status: Status.Done,
        type: Type.AdminToPsi,
        psikolog: { id: psikolog.id },
      },
    });
  }

  async findAllRejectPsi(id: string) {
    const psikolog = await this.psikologService.findOne(id);
    return this.transactionRepository.find({
      relations: {
        psikolog: true,
        bank: true,
      },
      where: {
        status: Status.Reject,
        type: Type.AdminToPsi,
        psikolog: { id: psikolog.id },
      },
    });
  }

  async findAllPendingPsi(id: string) {
    const psikolog = await this.psikologService.findOne(id);
    return await this.transactionRepository.find({
      relations: {
        psikolog: true,
        bank: true,
      },
      where: {
        status: Status.PendingToPsi,
        type: Type.AdminToPsi,
        psikolog: { id: psikolog.id },
      },
    });
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    try {
      let status: any = 'pending';
      let types: any = 'seminar';

      let seminar: Seminar;
      const findCustomer = await this.customerService.findOne(
        createTransactionDto.customer,
      );
      const findBank = await this.bankService.findOneUser(
        createTransactionDto.bank,
      );
      let price = createTransactionDto.detailOrder.reduce(
        (acc, val) => acc + val.price,
        0,
      );

      const transactionEntity = new Transaction();
      transactionEntity.customer = findCustomer;
      transactionEntity.bank = findBank;
      transactionEntity.exp_date = createTransactionDto.exp_date;
      transactionEntity.type = createTransactionDto.type;
      transactionEntity.transaction_amount = price;
      transactionEntity.payment_proof = createTransactionDto.payment_proof;
      transactionEntity.status = status;
      const insertTransaction = await this.transactionRepository.insert(
        transactionEntity,
      );

      createTransactionDto.detailOrder.map(async (val) => {
        seminar = await this.seminarService.findOne(val.id);

        const detailEntity = new DetailOrder();
        detailEntity.transaction = insertTransaction.identifiers[0].id;
        detailEntity.customer = transactionEntity.customer;
        detailEntity.seminar = seminar;
        detailEntity.price = transactionEntity.transaction_amount;
        detailEntity.types = types;
        await this.detailOrderRepository.insert(detailEntity);
      });
      return this.transactionRepository.findOneOrFail({
        where: { id: insertTransaction.identifiers[0].id },
      });
    } catch (error) {
      throw error;
    }
  }

  async createTransactionKonseling(
    createTransactionKonseling: CreateTransactionKonselingDto,
  ) {
    try {
      let status: any = 'pending';
      let types: any = 'private_konseling';

      const findCustomer = await this.customerService.findOne(
        createTransactionKonseling.customer,
      );
      const findBank = await this.bankService.findOneUser(
        createTransactionKonseling.bank,
      );

      const findOnePsikolog = await this.psikologService.findOne(
        createTransactionKonseling.psikolog,
      );

      const privateKonselingEntity = new PrivateKonseling();
      privateKonselingEntity.psikolog = findOnePsikolog;
      privateKonselingEntity.datetime = createTransactionKonseling.datetime
      privateKonselingEntity.price = createTransactionKonseling.price;

      const insertPrivateKonseling =
        await this.privateKonselingRepository.insert(privateKonselingEntity);

      const transactionEntity = new Transaction();
      transactionEntity.customer = findCustomer;
      transactionEntity.bank = findBank;
      transactionEntity.transaction_amount = privateKonselingEntity.price * privateKonselingEntity.datetime.length;
      transactionEntity.exp_date = createTransactionKonseling.exp_date;
      transactionEntity.type = createTransactionKonseling.type;
      transactionEntity.payment_proof =
        createTransactionKonseling.payment_proof;
      transactionEntity.status = status;
      const insertTransaction = await this.transactionRepository.insert(
        transactionEntity,
      );

      const detailEntity = new DetailOrder();
      detailEntity.transaction = insertTransaction.identifiers[0].id;
      detailEntity.customer = transactionEntity.customer;
      detailEntity.privateKonseling = insertPrivateKonseling.identifiers[0].id;
      detailEntity.price = privateKonselingEntity.price * privateKonselingEntity.datetime.length;
      detailEntity.types = types;

      const insertDetailOrder = await this.detailOrderRepository.insert(detailEntity);

      return ( this.transactionRepository.findOneOrFail({
        where: { id: insertTransaction.identifiers[0].id }, relations: {detailOrder: {privateKonseling:{psikolog: true}}}
      })
      )
    } catch (error) {
      throw error;
    }
  }

  async findDetailOrderPsikolog(id: string) {
    try {
      const currentDate = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);
      const psikolog = await this.psikologService.findOne(id);
      const data = await this.detailOrderRepository
        .createQueryBuilder('detailOrder')
        .leftJoinAndSelect('detailOrder.privateKonseling', 'privateKonseling')
        .leftJoinAndSelect('detailOrder.seminar', 'seminar')
        .leftJoinAndSelect('seminar.psikologseminar', 'psikologseminar')
        .leftJoinAndSelect('detailOrder.transaction', 'transaction')
        .where('privateKonseling.psikolog.id = :id', { id: psikolog.id })
        .orWhere('psikologseminar.psikolog.id = :id', { id: psikolog.id })
        .andWhere('transaction.type = :type', { type: Type.CusToAdmin })
        .getMany();
      return data;
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

  async createTransactionPsikolog(
    createTransactionPsikologDto: CreateTransactionPsikologDto,
  ) {
    try {
      let status: any = 'pendingToPayPsi';
      const findPsikolog = await this.psikologService.findOne(
        createTransactionPsikologDto.psikolog,
      );
      const findBank = await this.bankService.findOneUser(
        createTransactionPsikologDto.bank,
      );
      const find = await this.findDetailOrderPsikolog(
        createTransactionPsikologDto.psikolog,
      );
      let totals = find.reduce((acc, val) => acc + val.price, 0);

      const transactionEntity = new Transaction();
      transactionEntity.psikolog = findPsikolog;
      transactionEntity.bank = findBank;
      transactionEntity.transaction_amount = totals;
      transactionEntity.exp_date = createTransactionPsikologDto.exp_date;
      transactionEntity.payment_proof =
        createTransactionPsikologDto.payment_proof;
      transactionEntity.status = status;
      transactionEntity.type = createTransactionPsikologDto.type;
      const insertTransaction = await this.transactionRepository.insert(
        transactionEntity,
      );
      return this.transactionRepository.findOneOrFail({
        where: { id: insertTransaction.identifiers[0].id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.transactionRepository.findOneOrFail({
        where: { id },
        relations: {
          customer: true,
          detailOrder: { seminar: true, privateKonseling: {psikolog: true} },
          bank: true,
        },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          { statusCode: HttpStatus.NOT_FOUND, error: 'Data Not Found' },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw error;
      }
    }
  }

  async findOneDetail(id: string) {
    try {
      const data = await this.findOne(id);
      return await this.detailOrderRepository.findOneOrFail({
        where: { transaction: { id: data.id } },
        relations: { seminar: true, privateKonseling: true, transaction: true },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          { statusCode: HttpStatus.NOT_FOUND, error: 'Data Not Found' },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw error;
      }
    }
  }

  async findAllByPsikolog(id: string) {
    try {
      const psikolog = await this.psikologService.findOne(id);
      const find = await this.findDetailOrderPsikolog(psikolog.id);
      const totals = find.reduce((acc, val) => acc + val.price, 0);
      const count = find.length;
      return {
        datas: find,
        totals: totals,
        counts: count,
      };
    } catch (error) {
      return error;
    }
  }

  async rekomenPsikolog() {
    try {
      const data = await this.transactionRepository
        .createQueryBuilder()
        .select('psikolog.id', 'psikolog_id')
        .addSelect('psikolog.full_name', 'psikolog_nama')
        .addSelect('psikolog.photo', 'psikolog_photo')
        .addSelect('psikolog.spesialis', 'psikolog_spesialis')
        .addSelect('COUNT("transaction".id)', 'jumlah_transaction') // Menggunakan tanda kutip belakang
        .from(Psikolog, 'psikolog')
        .innerJoin(PsikologSeminar, 'ps', 'ps.psikolog_id = psikolog.id')
        .innerJoin(Seminar, 's', 'ps.seminar_id = s.id')
        .innerJoin(DetailOrder, 'd', 's.id = d.seminar_id')
        .innerJoin(
          Transaction,
          'transaction',
          'd.transaction_id = "transaction".id',
        ) // Menggunakan tanda kutip belakang
        .groupBy(
          'psikolog.id, psikolog.full_name, psikolog.photo, psikolog.spesialis',
        )
        .orderBy('jumlah_transaction', 'DESC')
        .getRawMany();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    try {
      if (updateTransactionDto.status === 'reject') {
        await this.findOne(id);

        const transactionEntity = new Transaction();
        transactionEntity.payment_proof = updateTransactionDto.payment_proof;

        await this.transactionRepository.update(id, transactionEntity);
        return this.transactionRepository.findOneOrFail({ where: { id } });
      }
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
  async updateKonseling(
    id: string,
    updateTransactionDto: UpdateTransactionKonselingDto,
  ) {
    try {
      if (updateTransactionDto.status === 'reject') {
        await this.findOne(id);

        const transactionEntity = new Transaction();
        transactionEntity.payment_proof = updateTransactionDto.payment_proof;

        await this.transactionRepository.update(id, transactionEntity);
        return this.transactionRepository.findOneOrFail({ where: { id } });
      }
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

  async deleteTransaction(id: string) {
    try {
      await this.findOne(id);
      await this.transactionRepository.softDelete(id);
      return `Delete Success`;
    } catch (error) {
      throw error;
    }
  }

  async reject(id: string, updateDto: RejectTransactionDto) {
    try {
      const cari = await this.findOne(id);
      if (cari.status === 'pending') {
        const status: any = 'reject';
        const entity = new Transaction();
        entity.alasan = updateDto.alasan;
        entity.status = status;

        await this.transactionRepository.update(id, entity);
        return this.transactionRepository.findOneOrFail({
          where: { id },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async approve(id: string) {
    try {
      await this.findOne(id);
      const data = await this.findOneDetail(id);

      const status: any = 'approve';
      const entity = new Transaction();
      entity.status = status;

      await this.seminarService.decrement(data.seminar.id);
      await this.transactionRepository.update(id, entity);
      return this.transactionRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async Done(id: string, updateDto: UpdateTransactionDto) {
    try {
      await this.findOne(id);

      const status: any = 'done';
      const entity = new Transaction();
      entity.status = status;

      await this.transactionRepository.update(id, entity);
      return this.transactionRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
