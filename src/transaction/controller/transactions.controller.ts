import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import { TransactionDto } from '../dto/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() transactionDto: TransactionDto) {
    try {
      return await this.transactionsService.create(transactionDto);
    } catch (error) {
      throw new HttpException('Erreur lors de la création de la transaction', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.transactionsService.findAll();
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des transactions', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.transactionsService.findOne(+id);
    } catch (error) {
      throw new HttpException('Transaction non trouvée', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() transactionDto: TransactionDto) {
    try {
      return await this.transactionsService.update(+id, transactionDto);
    } catch (error) {
      throw new HttpException('Erreur lors de la mise à jour de la transaction', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.transactionsService.remove(+id);
      return { message: 'Transaction supprimée avec succès' };
    } catch (error) {
      throw new HttpException('Erreur lors de la suppression de la transaction', HttpStatus.NOT_FOUND);
    }
  }

  @Get('summary')
  async getBudgetSummary() {
    try {
      return await this.transactionsService.getBudgetSummary();
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération du résumé du budget', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}