import merge from 'lodash/merge';
import { v4 } from 'uuid';

import ICreateBreakdownsDTO from '@modules/inspections/dtos/ICreateBreakdownsDTO';
import Breakdown from '@modules/inspections/infra/typeorm/entities/Breakdown';

import IInspectionsBreakdownsRepository from '../IInspectionsBreakdownsRepository';

class FakeInspectionsBreakdownsRepository
  implements IInspectionsBreakdownsRepository {
  private breakdowns: Breakdown[] = [];

  public async create(data: ICreateBreakdownsDTO): Promise<Breakdown> {
    const breakdown = new Breakdown();

    merge(
      Breakdown,
      { id: v4(), created_at: new Date(), updated_at: new Date() },
      data,
    );

    this.breakdowns.push(breakdown);

    return breakdown;
  }

  public async save(breakdown: Breakdown): Promise<Breakdown> {
    const findIndex = this.breakdowns.findIndex(
      findBreakdown => findBreakdown.id === breakdown.id,
    );

    this.breakdowns[findIndex] = breakdown;

    return breakdown;
  }
}

export default FakeInspectionsBreakdownsRepository;
