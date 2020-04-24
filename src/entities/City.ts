import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Department } from './Department';
import { Municipality } from './Municipality';
import { Client } from './Client';

@Entity()
@Unique(["name", "municipality"])
export class City {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "varchar",
        length: 100
    })
    name: string;

    @Column({
        type: "varchar",
        length: 15,
        unique: true
    })
    danecode: string;

    @ManyToOne(type => Municipality, municipality => municipality.cities)
    municipality: number;

    @OneToMany(type => Client, client => client.city)
    clients: Client[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}