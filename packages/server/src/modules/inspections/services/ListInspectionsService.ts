import { endOfDay, startOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Inspection, {
  Status,
} from '@modules/inspections/infra/typeorm/entities/Inspection';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';

interface IRequest {
  start_date?: Date;
  end_date?: Date;
  status?: Status;
  is_detailed: boolean;
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
    is_detailed,
  }: IRequest): Promise<Inspection[]> {
    const inspections = await this.inspectionsRepository.findAllInspections({
      start_date: start_date ? startOfDay(start_date) : undefined,
      end_date: end_date ? endOfDay(end_date) : undefined,
      status,
      is_detailed,
    });

    return inspections;
  }
}

export default ListInspectionsService;
