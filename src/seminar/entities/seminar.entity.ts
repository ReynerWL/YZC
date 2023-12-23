import { Customer } from '#/customer/entities/customer.entity';
import { DetailOrder } from '#/detail_order/entities/detail_order.entity';
import { Psikolog } from '#/psikolog/entities/psikolog.entity';
import { PsikologSeminar } from '#/psikolog_seminar/entities/psikolog_seminar.entity';
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

  @OneToMany(()=> PsikologSeminar, psikologseminar => psikologseminar.seminar)
  psikologseminar: PsikologSeminar[]

  @Column({type: 'text'})
  title: string

  @Column({type: 'int'})
  price: number
  
  @Column({type: 'text'})
  poster: string

  @Column({type: 'text'})
  link: string

  @Column({type: 'timestamp with time zone', nullable: true})
  datetime: Date

  @Column({type: 'enum', enum: Status })
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

  @OneToMany(() => DetailOrder, detailOrder => detailOrder.seminar)
  detailOrder: DetailOrder
}