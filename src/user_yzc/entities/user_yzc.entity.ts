<<<<<<< HEAD
import { Bank } from '#/bank/entities/bank.entity';
import { Customer } from '#/customer/entities/customer.entity';
=======
import { Artikel } from '#/artikel/entities/artikel.entity';
>>>>>>> nazhwa
import { Level_User } from '#/level_user/entities/level_user.entity';
import { Notifikasi } from '#/notifikasi/entities/notifikasi.entity';
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
  OneToMany,
} from 'typeorm';

export enum StatusAcount {
  PENDING = 'pending',
  ACTIVE = 'active',
  NOT_ACTIVE = 'not active',
}

@Entity()
export class User_Yzc {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Level_User, (level_user) => level_user.user_yzc)
  level_user: Level_User;

  @OneToMany(() => Notifikasi, (notif1) => notif1.penerima)
  notif1: Notifikasi;

  @OneToMany(() => Notifikasi, (notif2) => notif2.pengirim)
  notif2: Notifikasi;

  @OneToMany(() => Artikel, (artikel) => artikel.user_yzc)
  artikel: Artikel;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

<<<<<<< HEAD
  @Column({type: 'enum', enum: StatusAcount})
  status: StatusAcount

  @Column({nullable: true})
=======
  @Column({ nullable: true })
>>>>>>> nazhwa
  salt: string;

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

  @OneToOne(() => Psikolog, (psikolog) => psikolog.user_yzc)
  psikolog: Psikolog

  @OneToOne(() => Customer, (customer) => customer.user_yzc)
  customer: Customer

  @OneToMany(() => Bank, (bank) => bank.userYzc)
  bank: Bank

  // @VersionColumn()
  // version: number;
}
