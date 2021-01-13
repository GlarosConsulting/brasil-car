import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCashHandlingService from '@modules/cash_handling/services/CreateCashHandlingService';
import ListByDateInterval from '@modules/cash_handling/services/ListByDateInterval';
import ListCashHandlingService from '@modules/cash_handling/services/ListCashHandlingService';

export default class CashHandling {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      date,
      bank_value,
      return_value,
      bank_tariff_value,
      is_previous_balance,
    } = request.body;

    const createCashHandling = container.resolve(CreateCashHandlingService);

    let formData;

    if (is_previous_balance) {
      formData = {
        date,
        bank_value,
        return_value,
        bank_tariff_value,
        is_previous_balance,
      };
    } else {
      formData = {
        date,
        bank_value,
        return_value,
        bank_tariff_value,
      };
    }

    const cashHandling = await createCashHandling.execute(formData);

    return response.json(classToClass(cashHandling));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { initialDate, finalDate } = request.query;

    if (initialDate && finalDate) {
      const listCashHandling = container.resolve(ListByDateInterval);

      const cashHandlingFiltered = await listCashHandling.execute({
        initialDate: new Date(initialDate.toString()),
        finalDate: new Date(finalDate.toString()),
      });

      return response.json(classToClass(cashHandlingFiltered));
    }

    const listCashHandling = container.resolve(ListCashHandlingService);

    const cashHandling = await listCashHandling.execute();

    return response.json(classToClass(cashHandling));
  }
}
