import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn  } from 'typeorm';

@Entity()
export class DocumentType {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "varchar",
        length: 60,
        unique: true
    })
    name: string;

    @Column()
    modulo: number;

    @Column()
    estado: number;

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}