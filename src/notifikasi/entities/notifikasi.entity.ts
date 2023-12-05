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

export enum StatusNotifikasi {
    UNREAD = 'unread',
    ALREADY_READ = 'AlreadyRead'
}

@Entity()
export class Notifikasi {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=> Customer)
    @JoinColumn()
    customer: Customer

    @ManyToOne(()=> Psikolog)
    @JoinColumn()
    psikolog: Psikolog
    
    @Column({
        type :"enum",
        enum: StatusNotifikasi,
        default: StatusNotifikasi.UNREAD,
      })
      statusNotifikasi: StatusNotifikasi

    @Column({
        type :"text"
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
