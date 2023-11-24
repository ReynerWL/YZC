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
import { Seminar, Status } from "#/seminar/entities/seminar.entity";
import { Customer } from '#/customer/entities/customer.entity';

@Entity('order_yzc')
export class OrderYzc{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({type: 'int'})
  transaction_amount: Number

  @Column({type: 'time without time zone'})
  exp_date: Date

  @Column({type: 'enum', enum: Status})
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
  
  @ManyToOne(() => Customer, customer => customer.seminar)
  @JoinColumn({name: 'customer'})
  customer: Customer
  
  @ManyToOne(() => Seminar, seminar => seminar.customer)
  @JoinColumn({name: 'seminar'})
  seminar: Seminar
}