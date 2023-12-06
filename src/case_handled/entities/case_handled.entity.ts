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
    JoinColumn,
    ManyToMany,
    OneToMany,
    JoinTable,
  } from 'typeorm';

  @Entity()
  export class CaseHandled{
    @PrimaryGeneratedColumn()
    id: string

    @OneToOne(() => Psikolog)
    @JoinColumn()
    psikolog : Psikolog

    @Column()
    title: string

    @Column({type: "date"})
    start_date: Date

    @Column({type: 'date'})
    end_date: Date

    @Column({type: 'text'})
    description: string

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

  }