import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable} from 'typeorm';
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Role } from './Role';
import { Permission } from './Permission';

@Entity()
@Unique(["email"])
export class User{

  @PrimaryGeneratedColumn('increment')
  id:string;

  @Column({
      type: 'varchar',
      nullable: false,
      length: 50,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  estado: string;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @ManyToMany(type => Permission, permission => permission.users)
  @JoinTable()
  permissions: Permission[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 6);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }


}
