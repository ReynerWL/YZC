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
    ManyToOne,
    OneToOne,
    JoinColumn,
    ManyToMany,
    OneToMany,
    JoinTable,
  } from 'typeorm';
  
  export enum Gender{
    Pria = 'pria',
    Wanita = 'wanita'
  }
  export enum Religion{
    Islam = 'Islam',
    Katolik = 'Katolik',
    Protestan = 'Protestan',
    Buddha = 'Buddha',
    Hindu = 'Hindu',
    Konghuchu = 'Konghuchu'
  }


@Entity()
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => User_Yzc)
    @JoinColumn()
    user_yzc : User_Yzc

    @Column({type: 'varchar'})
    full_name: string

    @Column({type: 'date'})
    birth_date: Date

    @Column({type: 'enum', enum: Gender})
    gender : Gender

    @Column({type: 'enum', enum: Religion })
    religion: Religion

    @Column({type: 'char', length: 15})
    phone_number: string

    @Column({type: 'varchar'})
    last_education: string

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