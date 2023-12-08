import { Customer } from '#/customer/entities/customer.entity';
import { PrivateKonseling } from '#/private_konseling/entities/private_konseling.entity';
import { Seminar } from '#/seminar/entities/seminar.entity';
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

  @Entity()
  export class DetailOrder{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => PrivateKonseling, privateKonseling => privateKonseling.detailOrder)
    privateKonseling : PrivateKonseling

    @OneToOne(() => Seminar)
    @JoinColumn()
    seminar: Seminar

    @OneToOne(() => Transaction)
    @JoinColumn()
    transaction: Transaction

    @ManyToOne(() => Customer, customer => customer.detailOrder)
    customer: Customer

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