import { getRepository, Repository } from 'typeorm';

import ICreateInspectionGlassDTO from '@modules/inspections/dtos/ICreateInspectionGlassDTO';
import IInspectionGlassRepository from '@modules/inspections/repositories/IInspectionGlassRepository';

import InspectionGlass from '../entities/InspectionGlass';

class InspectionGlasRepository implements IInspectionGlassRepository {
  private ormRepository: Repository<InspectionGlass>;

  constructor() {
    this.ormRepository = getRepository(InspectionGlass);
  }

  public async create(
    data: ICreateInspectionGlassDTO,
  ): Promise<InspectionGlass> {
    const inspectionGlass = this.ormRepository.create(data);

    await this.ormRepository.save(inspectionGlass);

    return inspectionGlass;
  }

  public async save(
    inspectionGlass: InspectionGlass,
  ): Promise<InspectionGlass> {
    return this.ormRepository.save(inspectionGlass);
  }
}

export default InspectionGlasRepository;
