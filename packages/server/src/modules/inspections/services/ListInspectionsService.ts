import { injectable, inject } from 'tsyringe';

import Inspection, {
  Status,
} from '@modules/inspections/infra/typeorm/entities/Inspection';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';

interface IRequest {
  start_date?: Date;
  end_date?: Date;
  status?: Status;
}

@injectable()
class ListInspectionsService {
  constructor(
    @inject('InspectionsRepository')
    private inspectionsRepository: IInspectionsRepository,
  ) {}

  public async execute({
    start_date,
    end_date,
    status,
  }: IRequest): Promise<Inspection[]> {
    const inspections = await this.inspectionsRepository.findAll({
      start_date,
      end_date,
      status,
    });

    return inspections;
  }
}

export default ListInspectionsService;
