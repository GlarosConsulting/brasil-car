import { getRepository, Repository } from 'typeorm';

import ICreateReturnFilesDTO from '@modules/return_files/dtos/ICreateReturnFilesDTO';
import IReturnFilesRepository from '@modules/return_files/repositories/IReturnFilesRepository';

import ReturnFiles from '../entities/ReturnFiles';

class ReturnFilesRepository implements IReturnFilesRepository {
  private ormRepository: Repository<ReturnFiles>;

  constructor() {
    this.ormRepository = getRepository(ReturnFiles);
  }

  public async find(): Promise<ReturnFiles[] | undefined> {
    const returnFiles = await this.ormRepository.find();

    return returnFiles;
  }

  public async create(data: ICreateReturnFilesDTO): Promise<ReturnFiles> {
    const returnFiles = this.ormRepository.create(data);

    await this.ormRepository.save(returnFiles);

    return returnFiles;
  }

  public async save(returnFiles: ReturnFiles): Promise<ReturnFiles> {
    return this.ormRepository.save(returnFiles);
  }
}

export default ReturnFilesRepository;
