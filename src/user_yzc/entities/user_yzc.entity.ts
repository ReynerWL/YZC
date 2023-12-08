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

@Entity()
export class User_Yzc {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Level_User, (level_user) => level_user.user_yzc)
  level_user : Level_User;

  @OneToMany(() => Notifikasi, (notif1) => notif1.penerima)
  notif1: Notifikasi;

  @OneToMany(() => Notifikasi, (notif2) => notif2.pengirim)
  notif2: Notifikasi;

  @Column({type: 'varchar'})
  email: string;

  @Column({type: 'varchar'})
  password: string;

  @Column({nullable: true})
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

  @OneToOne(() => Psikolog, (psikolog) => psikolog.user_yzc )
  psikolog: Psikolog


  // @VersionColumn()
  // version: number;
}
