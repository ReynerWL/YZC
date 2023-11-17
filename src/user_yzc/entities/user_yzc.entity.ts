import { Level_User } from '#/level_user/entities/level_user.entity';
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


  // @VersionColumn()
  // version: number;
}
