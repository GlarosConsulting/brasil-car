import { getRepository, Repository } from 'typeorm';

import ICreateInspectionDTO from '@modules/inspections/dtos/ICreateInspectionDTO';
import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';

class InspectionsRepository implements IInspectionsRepository {
  private ormRepository: Repository<Inspection>;

  constructor() {
    this.ormRepository = getRepository(Inspection);
  }

  public async findById(id: string): Promise<Inspection | undefined> {
    const inspection = await this.ormRepository.findOne(id, {
      relations: ['roles'],
    });

    return inspection;
  }

  public async create(data: ICreateInspectionDTO): Promise<Inspection> {
    const inspection = this.ormRepository.create(data);

    await this.ormRepository.save(inspection);

    return inspection;
  }

  public async save(inspection: Inspection): Promise<Inspection> {
    return this.ormRepository.save(inspection);
  }
}

export default InspectionsRepository;
