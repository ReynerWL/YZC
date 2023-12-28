import { Customer } from '#/customer/entities/customer.entity';
import { PrivateKonseling } from '#/private_konseling/entities/private_konseling.entity';
import { Psikolog } from '#/psikolog/entities/psikolog.entity';
import { Seminar } from '#/seminar/entities/seminar.entity';
import { Transaction } from '#/transaksi/entities/transaction.entity';
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
    JoinColumn,
    ManyToMany,
    OneToMany,
    JoinTable,
  } from 'typeorm';

  export enum types {
    Seminar = 'seminar',
    Private_Konseling = 'private_konseling'
  }

  @Entity()
  export class DetailOrder{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => PrivateKonseling, privateKonseling => privateKonseling.detailOrder)
    privateKonseling : PrivateKonseling

    @ManyToOne(() => Seminar, seminar => seminar.detailOrder)
    seminar: Seminar

    @ManyToOne(() => Transaction, transaction => transaction.detailOrder)
    transaction: Transaction

    @ManyToOne(() => Customer, customer => customer.detailOrder)
    customer: Customer

    @ManyToOne(() => Psikolog, psikolog => psikolog.detailOrder)
    psikolog: Psikolog

    @Column({type: 'int'})
    price: number

    @Column({type: 'enum', enum: types, nullable: true})
    types: types

    @CreateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
      })
      createdAt: Date;
    
      @UpdateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
      })
      updatedAt: Date;
    
      @DeleteDateColumn({
        type: 'timestamp with time zone',
        nullable: true,
      })
      deletedAt: Date;
  }