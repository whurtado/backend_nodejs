import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Module } from './Module';
import { Status } from './Status';
import { Client } from './Client';

@Entity()
export class DocumentType {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "varchar",
        length: 100
    })
    name: string;
    
    @ManyToOne(type => Module, module => module.status)
    module: number;

    @ManyToOne(type => Status, status => status.documenttypes)
    status: number;

    @OneToMany(type => Client, client => client.documenttype)
    clients: Client[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}