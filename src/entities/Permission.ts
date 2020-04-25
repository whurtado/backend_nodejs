import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Department } from './Department';
import { Role } from './Role';
import { User } from './User';

@Entity()
export class Permission {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
    })
    name: string;

    @ManyToMany(type => Role, role => role.permissions)
    roles: Role[];


    @ManyToMany(type => User, user => user.permissions)
    users: User[];

    @Column()
    @CreateDateColumn()
    createdat: Date;

    @Column()
    @UpdateDateColumn()
    updatedat: Date;

}