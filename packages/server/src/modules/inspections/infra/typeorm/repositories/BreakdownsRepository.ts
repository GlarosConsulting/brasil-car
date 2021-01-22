import { getRepository, Repository } from 'typeorm';

import ICreateBreakdownsDTO from '@modules/inspections/dtos/ICreateBreakdownsDTO';
import IBreakdownsRepository from '@modules/inspections/repositories/IBreakdownsRepository';

import Breakdown from '../entities/Breakdown';

class BreakdownsRepository implements IBreakdownsRepository {
  private ormRepository: Repository<Breakdown>;

  constructor() {
    this.ormRepository = getRepository(Breakdown);
  }

  public async create(data: ICreateBreakdownsDTO): Promise<Breakdown> {
    const breakdown = this.ormRepository.create(data);

    await this.ormRepository.save(breakdown);

    return breakdown;
  }

  public async save(breakdown: Breakdown): Promise<Breakdown> {
    return this.ormRepository.save(breakdown);
  }
}

export default BreakdownsRepository;
