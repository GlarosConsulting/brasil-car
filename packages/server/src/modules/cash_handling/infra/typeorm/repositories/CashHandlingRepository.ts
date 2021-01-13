import { Between, getRepository, Repository } from 'typeorm';

import ICreateCashHandlingDTO from '@modules/cash_handling/dtos/ICreateCashHandlingDTO';
import ICashHandlingRepository from '@modules/cash_handling/repositories/ICashHandlingRepository';

import CashHandling from '../entities/CashHandling';

class CashHandlingRepository implements ICashHandlingRepository {
  private ormRepository: Repository<CashHandling>;

  constructor() {
    this.ormRepository = getRepository(CashHandling);
  }

  public async find(): Promise<CashHandling[] | undefined> {
    const cashHandling = await this.ormRepository.find();

    return cashHandling;
  }

  public async findByDateInterval(
    initialDate: Date,
    finalDate: Date,
  ): Promise<CashHandling[] | undefined> {
    const cashHandling = await this.ormRepository.find({
      where: [
        { date: Between(initialDate, finalDate) },
        { is_previous_balance: true },
      ],
    });

    return cashHandling;
  }

  public async create(data: ICreateCashHandlingDTO): Promise<CashHandling> {
    const cashHandling = this.ormRepository.create(data);

    await this.ormRepository.save(cashHandling);

    return cashHandling;
  }

  public async save(cashHandling: CashHandling): Promise<CashHandling> {
    return this.ormRepository.save(cashHandling);
  }
}

export default CashHandlingRepository;
