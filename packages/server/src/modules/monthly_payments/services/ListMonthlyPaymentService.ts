import { startOfDay, endOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import MonthlyPayment from '@modules/monthly_payments/infra/typeorm/entities/MonthlyPayment';
import IMonthlyPaymentRepository from '@modules/monthly_payments/repositories/IMonthlyPaymentRepository';

import IListMonthlyPaymentDTO from '../dtos/IListMonthlyPaymentDTO';

@injectable()
class ListMonthlyPaymentService {
  constructor(
    @inject('MonthlyPaymentRepository')
    private monthlyPaymentRepository: IMonthlyPaymentRepository,
  ) {}

  public async execute({
    name,
    due_start_date,
    due_end_date,
    created_at_start_date,
    created_at_end_date,
    status,
  }: IListMonthlyPaymentDTO): Promise<MonthlyPayment[]> {
    const monthlyPayment = await this.monthlyPaymentRepository.find({
      name,
      due_start_date: due_start_date && startOfDay(due_start_date),
      due_end_date: due_end_date && endOfDay(due_end_date),
      created_at_start_date:
        created_at_start_date && startOfDay(created_at_start_date),
      created_at_end_date: created_at_end_date && endOfDay(created_at_end_date),
      status,
    });

    if (!monthlyPayment) {
      throw new AppError('Error.');
    }

    return monthlyPayment;
  }
}

export default ListMonthlyPaymentService;
