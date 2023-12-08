import { Psikolog } from '#/psikolog/entities/psikolog.entity';
import { Transaction } from '#/transaksi/entities/transaction.entity';
import { User_Yzc } from '#/user_yzc/entities/user_yzc.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    OneToMany,
  } from 'typeorm';

  @Entity()
  export class Bank{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    bank_name: string

    @Column()
    account_owner_name: string

    @Column({type: 'text'})
    qr: string

    @ManyToOne(() => User_Yzc, (userYzc) => userYzc.bank)
    userYzc: User_Yzc

    @ManyToOne(() => Psikolog, (psikolog) => psikolog.bank)
    psikolog: Psikolog

    @OneToMany(() => Transaction, transaction => transaction)
    transaction: Transaction
  }