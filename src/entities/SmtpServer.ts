import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Check } from 'typeorm';
import { Status } from './Status';

@Entity()
@Check("encryption = ANY(ARRAY['TLS','SSL'])")
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

    @Column({
        type: 'varchar',
        length: 10
    })
    encryption: string;

    @ManyToOne(type => Status, status => status.smtpservers)
    status: number;

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}