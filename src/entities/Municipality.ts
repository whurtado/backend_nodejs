import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Department } from './Department';
import { City } from './City';

@Entity()
@Unique(["name"])
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

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}