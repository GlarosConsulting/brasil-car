import ICreateBreakdownsDTO from '../dtos/ICreateBreakdownsDTO';
import Breakdown from '../infra/typeorm/entities/Breakdown';

export default interface IInspectionsBreakdownsRepository {
  create(data: ICreateBreakdownsDTO): Promise<Breakdown>;
  save(breakdown: ICreateBreakdownsDTO): Promise<Breakdown>;
}
