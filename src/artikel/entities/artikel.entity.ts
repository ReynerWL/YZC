import { Customer } from "#/customer/entities/customer.entity";
import { Psikolog } from "#/psikolog/entities/psikolog.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
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

    @ManyToOne(()=> Customer)
    @JoinColumn()
    customer: Customer

    @ManyToOne(()=> Psikolog)
    @JoinColumn()
    psikolog: Psikolog

    @Column({
        type : "varchar"
    })
    title : string;

    @Column({
        type : "text"
    })
    articleContent : string

    @Column({
        type : "text"
    })
    imgThumbnail : string

    @Column({
        type :"enum",
        enum: StatusArtikel,
        default: StatusArtikel.PENDING,
      })
      statusNotifikasi: StatusArtikel
      
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