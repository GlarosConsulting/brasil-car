import {
  Between,
  getRepository,
  LessThan,
  Like,
  MoreThan,
  Repository,
} from 'typeorm';

import ICreateMonthlyPaymentDTO from '@modules/monthly_payments/dtos/ICreateMonthlyPaymentDTO';
import IListMonthlyPaymentDTO from '@modules/monthly_payments/dtos/IListMonthlyPaymentDTO';
import IMonthlyPaymentRepository from '@modules/monthly_payments/repositories/IMonthlyPaymentRepository';

import MonthlyPayment from '../entities/MonthlyPayment';

class MonthlyPaymentRepository implements IMonthlyPaymentRepository {
  private ormRepository: Repository<MonthlyPayment>;

  constructor() {
    this.ormRepository = getRepository(MonthlyPayment);
  }

  public async find({
    due_start_date,
    due_end_date,
    created_at_start_date,
    created_at_end_date,
    name,
    status,
  }: IListMonthlyPaymentDTO): Promise<MonthlyPayment[] | undefined> {
    let dueDateCriteria;

    if (due_end_date) {
      dueDateCriteria = MoreThan(due_end_date);
    }

    if (due_start_date) {
      dueDateCriteria = LessThan(due_start_date);
    }

    if (due_start_date && due_start_date) {
      dueDateCriteria = Between(due_start_date, due_end_date);
    }

    let created_atDateCriteria;

    if (created_at_end_date) {
      created_atDateCriteria = MoreThan(created_at_end_date);
    }

    if (created_at_start_date) {
      created_atDateCriteria = LessThan(created_at_start_date);
    }

    if (created_at_start_date && created_at_start_date) {
      created_atDateCriteria = Between(
        created_at_start_date,
        created_at_end_date,
      );
    }

    const monthlyPayment = await this.ormRepository.find({
      order: { created_at: 'DESC' },
      where: {
        ...(dueDateCriteria && { due_date: dueDateCriteria }),
        ...(created_atDateCriteria && { created_at: created_atDateCriteria }),
        ...(status && { status }),
        ...(name && { name: Like(`%${name}%`) }),
      },
    });

    return monthlyPayment;
  }

  public async findById(id: string): Promise<MonthlyPayment | undefined> {
    const monthlyPayment = await this.ormRepository.findOne(id);

    return monthlyPayment;
  }

  public async create(data: ICreateMonthlyPaymentDTO): Promise<MonthlyPayment> {
    const monthlyPayment = this.ormRepository.create(data);

    await this.ormRepository.save(monthlyPayment);

    return monthlyPayment;
  }

  public async save(monthlyPayment: MonthlyPayment): Promise<MonthlyPayment> {
    return this.ormRepository.save(monthlyPayment);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default MonthlyPaymentRepository;
