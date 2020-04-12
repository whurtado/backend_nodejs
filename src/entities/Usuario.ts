import { Entity, Column, PrimaryGeneratedColumn, 
         Unique, CreateDateColumn, UpdateDateColumn 
} from 'typeorm';
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["email"])
export class Usuario{

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
