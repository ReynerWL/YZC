import { User } from '#/users/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    CreateDateColumn,
    OneToOne,
  } from 'typeorm';

  export enum GenderProduct{
    PRIA = 'pria',
    WANITA = 'wanitia',
  }

  export enum StatusPsikologAcount {
    PENDING = 'pending',
    ACTIVE = 'active',
    NOT_ACTIVE = 'not active',
  }

  @Entity()
  export class Psikolog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @OneToOne(()=> User,(user)=> user.psikolog)
    user : User

    @Column({
        type :"text"
    })
    photo: string;

    @Column({
      type :"varchar"
    })
    fullName: string;

    @Column({
      type :'enum',
      enum: GenderProduct
    })
    gender: GenderProduct

    @Column({
      type :"varchar",
    })
    phone: number;

    @Column({
      type :"varchar",
    })
    lastEducation: string;

    @Column({
      type:'enum',
      enum: StatusPsikologAcount,
      default: StatusPsikologAcount.PENDING,
    })
    status: StatusPsikologAcount;

    @Column({
      type :"text"
    })
    legality: string;

    @Column({
      type :"text"
    })
    aboutMe: string;

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