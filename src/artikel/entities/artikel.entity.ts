import { strict } from 'assert';
import { string } from 'joi';
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

  @Entity()
  export class Artikel{
    @PrimaryGeneratedColumn('uuid')
    id: string
  }