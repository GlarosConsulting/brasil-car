import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';

import ICreateInspectionDTO from '../dtos/ICreateInspectionDTO';

export default interface IInspectionsRepository {
  findById(id: string): Promise<Inspection | undefined>;
  create(data: ICreateInspectionDTO): Promise<Inspection>;
  save(inspection: Inspection): Promise<Inspection>;
}
