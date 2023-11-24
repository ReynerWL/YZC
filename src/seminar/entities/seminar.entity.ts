import { Customer } from '#/customer/entities/customer.entity';
import { OrderYzc } from '#/order/entities/order.entity';
import { Psikolog } from '#/psikolog/entities/psikolog.entity';
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
    OneToMany,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  export enum Status{
    Pending = 'pending',
    Approve = 'approve',
    Reject = 'reject'
  }


  @Entity()
  export class Seminar{
    @PrimaryGeneratedColumn('uuid')
    id: string

  @OneToMany(() => Psikolog, (psikolog) => psikolog.seminar )
  psikolog : Psikolog[]

  @Column({type: 'text'})
  title: string

  @Column({type: 'int'})
  price: number
  
  @Column({type: 'text'})
  poster: string

  @Column({type: 'text'})
  description: string

  @Column({type: 'time with time zone'})
  datetime: Date

  @Column({type: 'enum', enum: Status })
  status: Status

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

  @ManyToMany(() => Customer, customer => customer.seminar)
  @JoinTable({name: 'order_yzc'})
  customer: Customer
}