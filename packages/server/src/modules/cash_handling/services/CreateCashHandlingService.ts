import { injectable, inject } from 'tsyringe';

import CashHandling from '@modules/cash_handling/infra/typeorm/entities/CashHandling';
import ICashHandlingRepository from '@modules/cash_handling/repositories/ICashHandlingRepository';

interface IRequest {
  date: Date;
  bank_value: number;
  return_value: number;
  bank_tariff_value: number;
}

@injectable()
class CreateInspectionService {
  constructor(
    @inject('CashHandlingRepository')
    private cashHandlingRepository: ICashHandlingRepository,
  ) {}

  public async execute({
    date,
    bank_value,
    return_value,
    bank_tariff_value,
  }: IRequest): Promise<CashHandling> {
    const inspection = await this.cashHandlingRepository.create({
      date,
      bank_value,
      return_value,
      bank_tariff_value,
    });

    return inspection;
  }
}

export default CreateInspectionService;
