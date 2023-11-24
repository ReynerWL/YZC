import { PrivateKonseling } from '#/private_konseling/entities/private_konseling.entity';
import { Seminar } from '#/seminar/entities/seminar.entity';
import { User_Yzc } from '#/user_yzc/entities/user_yzc.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    ManyToOne,
  } from 'typeorm';

  export enum GenderProduct{
    PRIA = 'pria',
    WANITA = 'wanitia',
  }


  @Entity()
  export class Psikolog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=> User_Yzc)
    @JoinColumn()
    user_yzc : User_Yzc

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

      @ManyToOne(() => Seminar, (seminar) => seminar.psikolog)
      seminar: Seminar

      @OneToOne(() => PrivateKonseling, private_konseling => private_konseling.psikolog)
      private_konseling: PrivateKonseling
  }