import { Customer } from '#/customer/entities/customer.entity';
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
    ManyToMany,
    OneToMany,
    JoinTable,
  } from 'typeorm';

  @Entity()
  export class PrivateKonseling{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Customer, (customer) => customer.private_konseling)
    @JoinColumn()
    customer: Customer

    @OneToOne(() => Psikolog, (psikolog) => psikolog.private_konseling)
    @JoinColumn()
    psikolog: Psikolog
  }