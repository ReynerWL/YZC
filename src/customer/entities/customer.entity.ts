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
  } from 'typeorm';
  
  export enum CustomerGender{
    Pria = 'Pria',
    Wanita = 'Wanita'
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

    @Column({type: 'enum', enum: CustomerGender})
    gender : CustomerGender

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