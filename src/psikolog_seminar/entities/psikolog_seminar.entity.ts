import { Psikolog } from '#/psikolog/entities/psikolog.entity';
import { Seminar } from '#/seminar/entities/seminar.entity';
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
  export class PsikologSeminar{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Psikolog, psikolog => psikolog.psikologseminar)
    psikolog: Psikolog
    
    @ManyToOne(() => Seminar, seminar => seminar.psikologseminar)
    seminar: Seminar

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