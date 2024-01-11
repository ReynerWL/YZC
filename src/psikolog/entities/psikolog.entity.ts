import { Bank } from '#/bank/entities/bank.entity';
import { Religion } from '#/customer/entities/customer.entity';
import { DetailOrder } from '#/detail_order/entities/detail_order.entity';
import { PrivateKonseling } from '#/private_konseling/entities/private_konseling.entity';
import { PsikologSeminar } from '#/psikolog_seminar/entities/psikolog_seminar.entity';
import { Seminar } from '#/seminar/entities/seminar.entity';
import { Transaction } from '#/transaksi/entities/transaction.entity';
import { User_Yzc } from '#/user_yzc/entities/user_yzc.entity';
import { string } from "joi";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
  } from 'typeorm';

  export enum GenderProduct{
    PRIA = 'pria',
    WANITA = 'wanita',
  }


  @Entity()
  export class Psikolog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=> User_Yzc)
    @JoinColumn()
    user_yzc : User_Yzc

    @Column({
        type :"text"
    })
    photo: string;

    @Column({
      type :"varchar"
    })
    fullName: string;

    @Column({
      type :'enum',
      enum: GenderProduct
    })
    gender: GenderProduct

    @Column({type: 'char', length: 15})
    phone: string;

    @Column({
      type :"varchar",
    })
    lastEducation: string;

    @Column({
      type :"text"
    })
    legality: string;

    @Column({
      type :"text"
    })
    aboutMe: string;

    @Column({
      type: 'enum', enum: Religion
    })
    religion: Religion

    @Column({
      type: 'date'
    })
    birth_date: Date

    @Column({
      type: 'text',
      nullable: true
    })
    caseHandled: string

    @Column({type: 'text', nullable:true})
    spesialis: string

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
  
      @VersionColumn()
      version: number;

      @ManyToOne(() => Seminar, (seminar) => seminar.psikolog)
      seminar: Seminar

      @OneToMany(() => Bank, (bank) => bank.psikolog)
      bank: Bank

      @OneToMany(() => PsikologSeminar, listseminar => listseminar.psikolog)
      psikologseminar: PsikologSeminar[]

      @OneToMany(() => DetailOrder, detailOrder => detailOrder.psikolog)
      detailOrder: DetailOrder

      @OneToMany(() => Transaction, transaction => transaction.psikolog)
      transaction: Transaction

      @OneToMany(()=> PrivateKonseling, privateKonseling => privateKonseling.psikolog)
      privateKonseling: PrivateKonseling
  }