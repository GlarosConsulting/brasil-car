import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IBreakdownsRepository from '@modules/inspections/repositories/IBreakdownsRepository';

import Breakdown from '../infra/typeorm/entities/Breakdown';

interface IRequest {
  inspection_id: string;
  img_filename: string;
}

@injectable()
class CreateBreakdownsService {
  constructor(
    @inject('BreakdownsRepository')
    private breakdownsRepository: IBreakdownsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    inspection_id,
    img_filename,
  }: IRequest): Promise<Breakdown> {
    const filename = await this.storageProvider.saveFile(img_filename);

    const breakdown = await this.breakdownsRepository.create({
      inspection_id,
      img_filename: filename,
    });

    return breakdown;
  }
}

export default CreateBreakdownsService;
