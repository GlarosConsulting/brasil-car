import ICreateCashHandlingDTO from '../dtos/ICreateCashHandlingDTO';
import CashHandling from '../infra/typeorm/entities/CashHandling';

export default interface IUsersRepository {
  find(): Promise<CashHandling[] | undefined>;
  findByDateInterval(
    initialDate: Date,
    finalDate: Date,
  ): Promise<CashHandling[] | undefined>;
  create(data: ICreateCashHandlingDTO): Promise<CashHandling>;
  save(user: CashHandling): Promise<CashHandling>;
}
