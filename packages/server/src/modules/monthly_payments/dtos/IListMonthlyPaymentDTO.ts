import { Status } from '../infra/typeorm/entities/MonthlyPayment';

export default interface IListMonthlyPaymentDTO {
  name?: string;
  due_start_date?: Date;
  due_end_date?: Date;
  created_at_start_date?: Date;
  created_at_end_date?: Date;
  status?: Status;
}
