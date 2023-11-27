import { Customer } from '#/customer/entities/customer.entity';
import { Psikolog } from '#/psikolog/entities/psikolog.entity';
import { Status } from '#/seminar/entities/seminar.entity';
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

    @OneToOne(() => Customer)
    @JoinColumn()
    customer: Customer

    @OneToOne(() => Psikolog)
    @JoinColumn()
    psikolog: Psikolog

    @Column({type: 'time with time zone'})
    datetime: Date

    @Column({type: 'int'})
    price: Number

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
  }