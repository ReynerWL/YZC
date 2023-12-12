import { Customer } from '#/customer/entities/customer.entity';
import { DetailOrder } from '#/detail_order/entities/detail_order.entity';
import { Psikolog } from '#/psikolog/entities/psikolog.entity';
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

  export enum Status{
    Pending = 'pending',
    Approve = 'approve',
    Reject = 'reject'
  }

  @Entity()
  export class PrivateKonseling{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Customer)
    @JoinColumn()
    customer: Customer

    @OneToOne(() => Psikolog)
    @JoinColumn()
    psikolog: Psikolog

    @Column({type: 'date'})
    start_date: Date

    @Column({type: 'date'})
    end_date: Date

    @Column({type: 'int'})
    price: number

    @Column({enum: Status,type: 'enum'})
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