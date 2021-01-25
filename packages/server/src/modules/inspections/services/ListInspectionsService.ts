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
  isDetailed: boolean;
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
    isDetailed,
  }: IRequest): Promise<Inspection[]> {
    const inspections = await this.inspectionsRepository.findAllInspections({
      start_date: start_date ? startOfDay(start_date) : undefined,
      end_date: end_date ? endOfDay(end_date) : undefined,
      status,
      isDetailed,
    });

    return inspections;
  }
}

export default ListInspectionsService;
