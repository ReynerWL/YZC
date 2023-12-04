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
import { Seminar} from "#/seminar/entities/seminar.entity";
import { Customer } from '#/customer/entities/customer.entity';
import { PrivateKonseling } from '#/private_konseling/entities/private_konseling.entity';

export enum Status{
  Pending = 'pending',
  Approve = 'approve',
  Reject = 'reject'
}

@Entity()
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
  
  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer
  
  @ManyToOne(() => Seminar, (seminar) => seminar.orderYzc)
  seminar: Seminar

  @OneToOne(() => PrivateKonseling)
  @JoinColumn()
  private_konseling: PrivateKonseling
}
