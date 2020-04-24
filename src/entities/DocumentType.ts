import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Module } from './Module';
import { State } from './State';
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
    
    @ManyToOne(type => Module, module => module.states)
    module: number;

    @ManyToOne(type => State, state => state.documenttypes)
    state: number;

    @OneToMany(type => Client, client => client.documenttype)
    clients: Client[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}