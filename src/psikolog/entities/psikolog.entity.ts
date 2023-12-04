import { Bank } from '#/bank/entities/bank.entity';
import { Gender } from '#/customer/entities/customer.entity';
import { PrivateKonseling } from '#/private_konseling/entities/private_konseling.entity';
import { Seminar } from '#/seminar/entities/seminar.entity';
import { User_Yzc } from '#/user_yzc/entities/user_yzc.entity';
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
    WANITA = 'wanitia',
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
      enum: Gender
    })
    gender: Gender

    @Column({type: 'char', length: 15})
    phone_number: string;

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
  }