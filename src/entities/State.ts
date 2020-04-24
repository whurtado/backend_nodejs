import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany  } from 'typeorm';
import {Module} from "./Module";
import { DocumentType } from './DocumentType';

@Entity()
export class State {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
    })
    name: string;

    @ManyToOne(type => Module, module => module.states)
    module: number;

    @OneToMany(type => DocumentType, documenttype => documenttype.state)
    documenttypes: DocumentType[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}