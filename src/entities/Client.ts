import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DocumentType } from './DocumentType';

@Entity()
export class Client{

  @PrimaryGeneratedColumn('increment')
  id:string;

  @Column({
      type: 'varchar',
      length: 50,
  })
  name: string;

  @Column({
    type: 'varchar'
  })
  lastname: string;

  @ManyToOne(type => DocumentType, documenttype => documenttype.clients)
  documenttype: number;

  @Column({
      type: 'varchar',
      length: 15
  })
  documentnumber: string;

}