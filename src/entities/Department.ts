import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Country } from './Country';
import { Municipality } from './Municipality';

@Entity()
@Unique(["name", "country"])
export class Department {

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

    @ManyToOne(type => Country, country => country.departments)
    country: number;

    @OneToMany(type => Municipality, municipality => municipality.department)
    municipalities: Municipality[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}