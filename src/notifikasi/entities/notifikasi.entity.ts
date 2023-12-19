import { User_Yzc } from "#/user_yzc/entities/user_yzc.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
} from 'typeorm'

export enum StatusNotifikasi {
  UNREAD = 'unread',
  ALREADY_READ = 'AlreadyRead'
}

@Entity()
export class Notifikasi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User_Yzc, (penerima) => penerima.notif1)
  penerima: User_Yzc

  @ManyToOne(() => User_Yzc, (pengirim) => pengirim.notif2)
  pengirim: User_Yzc     

  @Column({
    type: "enum",
    enum: StatusNotifikasi,
    default: StatusNotifikasi.UNREAD,
  })
  statusNotifikasi: StatusNotifikasi

  @Column({
    type: "text"
  })
  notificationContent: string;

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

  @VersionColumn()
  version: number;
}
