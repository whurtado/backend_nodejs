import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { DocumentType } from './DocumentType';
import { State } from './State';
import { City } from './City';

@Entity()
export class Client{

    @PrimaryGeneratedColumn('increment')
    id:string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    name: string;

    @Column({
        type: 'varchar'
    })
    lastname: string;

    @ManyToOne(type => DocumentType, documenttype => documenttype.clients)
    documenttype: number;

    @Column({
        type: 'varchar',
        length: 15
    })
    documentnumber: string;

    @Column({
        type: 'varchar',
        length: 15
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    homeaddres: string;

    @ManyToOne(type => State, state => state.clients)
    state: number;

    @ManyToOne(type => City, city => city.clients)
    city: number;

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}