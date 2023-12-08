import { Bank } from '#/bank/entities/bank.entity';
import { Customer } from '#/customer/entities/customer.entity';
import { PrivateKonseling } from '#/private_konseling/entities/private_konseling.entity';
import { Seminar } from '#/seminar/entities/seminar.entity';
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

  export enum Type{
    Bank = 'bank',
    E_wallet = 'e-wallet',

  }
  export enum Status{
    Pending = 'pending',
    Approve = 'approve',
    Reject = 'reject'
  }

  @Entity()
  export class Transaction{
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ManyToOne(()=> Customer, customer => customer.transaction)
    customer: Customer

    @OneToOne(()=> Seminar)
    @JoinColumn()
    seminar: Seminar

    @ManyToOne(() => PrivateKonseling, privateKonseling => privateKonseling.transaction)
    privateKonseling: PrivateKonseling

    @ManyToOne(() => Bank, bank => bank.transaction)
    bank: Bank

    @Column({type: 'enum', enum: Type})
    type: Type

    @Column({type: 'timestamp with time zone', nullable: true})
    exp_date: Date

    @Column({type: 'text'})
    payment_proof: string


    @Column({type: 'enum', enum: Status,default: 'pending'})
    status: Status

    @Column({type: 'text', nullable: true})
    alasan: string

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