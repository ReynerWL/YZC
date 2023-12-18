import { User_Yzc } from "#/user_yzc/entities/user_yzc.entity";
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
} from 'typeorm';

export enum GenderProduct {
  PRIA = 'pria',
  WANITA = 'wanita',
}

export enum Religion {
  ISLAM = 'islam',
  KATOLIK = 'katolik',
  PROTESTAN = 'protestan',
  BUDDHA = 'buddha',
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
  enum: GenderProduct
})
gender: GenderProduct

@Column({
  type :"enum",
  enum: Religion
})
religion: Religion

@Column({
  type :"varchar",
})
phone: number;

@Column({
  type :"varchar",
})
lastEducation: string;

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
}




