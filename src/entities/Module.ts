import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany  } from 'typeorm';
import { State } from './State';
import { DocumentType } from './DocumentType';

@Entity()
export class Module {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
    })
    name: string;

    @OneToMany(type => State, state => state.module)
    states: State[];

    @OneToMany(type => DocumentType, documenttype => documenttype.module)
    documenttypes: DocumentType[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;
}