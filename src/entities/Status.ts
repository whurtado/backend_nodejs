import { Entity, Column, Unique, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany  } from 'typeorm';
import {Module} from "./Module";
import { DocumentType } from './DocumentType';
import { Client } from './Client';
import { SmtpServer } from './SmtpServer';

@Entity()
@Unique(["name", "module"])
export class Status {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "varchar",
        length: 100
    })
    name: string;

    @ManyToOne(type => Module, module => module.status)
    module: number;

    @OneToMany(type => DocumentType, documenttype => documenttype.status)
    documenttypes: DocumentType[];

    @OneToMany(type => Client, client => client.status) 
    clients: Client[];

    @OneToMany(type => SmtpServer, smtpserver => smtpserver.status) 
    smtpservers: SmtpServer[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}