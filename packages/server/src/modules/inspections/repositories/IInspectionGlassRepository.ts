import ICreateInspectionGlassDTO from '../dtos/ICreateInspectionGlassDTO';
import InspectionGlass from '../infra/typeorm/entities/InspectionGlass';

export default interface IInspectionGlassRepository {
  create(data: ICreateInspectionGlassDTO): Promise<InspectionGlass>;
  save(InspectionGlass: ICreateInspectionGlassDTO): Promise<InspectionGlass>;
}
