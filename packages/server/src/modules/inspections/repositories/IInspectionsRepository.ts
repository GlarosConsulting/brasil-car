import IFindAllInspectionsDTO from '@modules/inspections/dtos/IFindAllInspectionsDTO';
import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';

import ICreateInspectionDTO from '../dtos/ICreateInspectionDTO';

export default interface IInspectionsRepository {
  findAllInspections(data: IFindAllInspectionsDTO): Promise<Inspection[]>;
  findById(id: string): Promise<Inspection | undefined>;
  create(data: ICreateInspectionDTO): Promise<Inspection>;
  save(inspection: Inspection): Promise<Inspection>;
}
