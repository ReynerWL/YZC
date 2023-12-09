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

export enum StatusArtikel {
  APPROVE = 'approve',
  REJECT = 'reject',
  PENDING = 'pending'
}

@Entity()
export class Artikel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User_Yzc, (admin) => admin.artikel1)
  admin: User_Yzc

  @ManyToOne(() => User_Yzc, (psikolog) => psikolog.artikel2)
  psikolog: User_Yzc 

  @Column({
    type: "varchar"
  })
  title: string;

  @Column({
    type: "text"
  })
  articleContent: string

  @Column({
    type: "text"
  })
  imgThumbnail: string

  @Column({
    type: "enum",
    enum: StatusArtikel,
    default: StatusArtikel.PENDING,
  })
  statusNotifikasi: StatusArtikel

  @Column({ type: 'text', nullable: true })
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

  @VersionColumn()
  version: number;
}