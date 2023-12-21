import { User_Yzc } from "#/user_yzc/entities/user_yzc.entity";
import { Transaction } from '#/transaksi/entities/transaction.entity';
import { DetailOrder } from '#/detail_order/entities/detail_order.entity';
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
  OneToMany,
} from 'typeorm';

export enum Gender {
  PRIA = 'pria',
  WANITA = 'wanita',
}

export enum Religion {
  ISLAM = 'islam',
  KATOLIK = 'katolik',
  PROTESTAN = 'protestan',
  BUDDHA = 'budha',
  HINDU = 'hindu',
  KONGHUCU = 'konghucu',
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

@OneToOne(()=> User_Yzc)
@JoinColumn()
user_yzc : User_Yzc

@Column({
  type :"varchar"
})
fullName: string;

@Column({
  type : "date"
})
birthDate: Date;

@Column({
  type :"enum",
  enum: Gender
})
gender: Gender

@Column({
  type :"enum",
  enum: Religion
})
religion: Religion

@Column({
  type :"varchar",
})
phone: string;

@Column({
  type :"varchar",
})
last_education: string;

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

@OneToMany(() => DetailOrder, detailOrder => detailOrder.customer)
detailOrder: DetailOrder

@OneToMany(() => Transaction, transaction => transaction.customer)
transaction: Transaction
}




