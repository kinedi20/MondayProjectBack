import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { TransactionDto } from '../dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) { }

  async create(transactionDto: TransactionDto): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(transactionDto);
    return await this.transactionsRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionsRepository.find();
  }

  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transaction #${id} not found`);
    }
    return transaction;
  }

  async update(id: number, transactionDto: TransactionDto): Promise<Transaction> {
    const transaction = await this.findOne(id);
    Object.assign(transaction, transactionDto);
    return await this.transactionsRepository.save(transaction);
  }

  async remove(id: number): Promise<void> {
    const result = await this.transactionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Transaction #${id} not found`);
    }
  }

  async getBudgetSummary() {
    const transactions = await this.findAll();
    console.log('transactions', transactions);

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    console.log('totalIncome', totalIncome);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    console.log('totalExpenses', totalExpenses);

    const remainingBudget = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      remainingBudget
    };
  }
}