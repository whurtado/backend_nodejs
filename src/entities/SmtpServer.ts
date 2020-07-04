import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SmtpServer {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        length: 150
    })
    host: string;

    @Column({
        type: 'integer',
    })
    port: number;

    @Column({
        type: 'varchar',
        length: 150
    })
    user: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    password: string;

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}