import { User_Yzc } from "#/user_yzc/entities/user_yzc.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Level_User{
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column({type: 'varchar'})
 name_level: string;

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

  @OneToMany(() => User_Yzc, (user_yzc) => user_yzc.level_user)
  user_yzc: User_Yzc[];
}