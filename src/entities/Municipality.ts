import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Department } from './Department';
import { City } from './City';

@Entity()
export class Municipality {

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

    @ManyToOne(type => Department, department => department.municipalities)
    department: number;

    @OneToMany(type => City, city => city.municipality)
    cities: City[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}