import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Department } from './Department';
import { Permission } from './Permission';
import { User } from './User';

@Entity()
export class Role {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
    })
    name: string;

    @Column({
        type: "text"
    })
    description: string;

    @ManyToMany(type => Permission, permission => permission.roles)
    @JoinTable()
    permissions: Permission[];

    @ManyToMany(type => User, user => user.roles)
    users: User[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}