import ICreateReturnFilesDTO from '../dtos/ICreateReturnFilesDTO';
import ReturnFiles from '../infra/typeorm/entities/ReturnFiles';

export default interface IReturnFilesRepository {
  find(): Promise<ReturnFiles[] | undefined>;
  create(data: ICreateReturnFilesDTO): Promise<ReturnFiles>;
  save(user: ReturnFiles): Promise<ReturnFiles>;
}
