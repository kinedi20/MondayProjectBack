import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // 'income' ou 'expense'

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  title: string;

  // @Column()
  // date: Date;
}