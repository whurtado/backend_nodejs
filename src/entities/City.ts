import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Department } from './Department';
import { Client } from './Client';

@Entity()
@Unique(["name", "department"])
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

    @ManyToOne(type => Department, department => department.cities)
    department: number;

    @OneToMany(type => Client, client => client.city)
    clients: Client[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}