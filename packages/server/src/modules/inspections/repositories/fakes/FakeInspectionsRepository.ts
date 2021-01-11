import merge from 'lodash/merge';
import { v4 } from 'uuid';

import ICreateInspectionDTO from '@modules/inspections/dtos/ICreateInspectionDTO';
import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';

import IInspectionsRepository from '../IInspectionsRepository';

class FakeInspectionsRepository implements IInspectionsRepository {
  private inspections: Inspection[] = [];

  public async findById(id: string): Promise<Inspection | undefined> {
    const findInspection = this.inspections.find(
      inspection => inspection.id === id,
    );

    return findInspection;
  }

  public async create(data: ICreateInspectionDTO): Promise<Inspection> {
    const inspection = new Inspection();

    merge(inspection, { id: v4(), roles: [] }, data);

    this.inspections.push(inspection);

    return inspection;
  }

  public async save(inspection: Inspection): Promise<Inspection> {
    const findIndex = this.inspections.findIndex(
      findInspection => findInspection.id === inspection.id,
    );

    this.inspections[findIndex] = inspection;

    return inspection;
  }
}

export default FakeInspectionsRepository;
