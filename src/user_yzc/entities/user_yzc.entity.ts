import { Level_User } from '#/level_user/entities/level_user.entity';
import { text } from 'stream/consumers';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User_Yzc {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Level_User, (level_user) => level_user.user_yzc)
  level_user : Level_User;

  @Column({type: 'text'})
  email: string;

  @Column({type: 'text'})
  password: string;

  @PrimaryGeneratedColumn('uuid')
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

  // @VersionColumn()
  // version: number;
}
