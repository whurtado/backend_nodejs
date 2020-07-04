import { Entity, Unique, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { DocumentType } from './DocumentType';
import { Status } from './Status';
import { City } from './City';

@Entity()
@Unique(["documenttype","documentnumber"])
export class Client{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({
        type: 'varchar',
        length: 50,
    })
    name: string;

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

    @ManyToOne(type => Status, status => status.clients)
    status: number;

    @ManyToOne(type => City, city => city.clients)
    city: number;

    @Column({
        type: 'varchar',
        length: 250,
        nullable: false
    })
    observations: string;

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}