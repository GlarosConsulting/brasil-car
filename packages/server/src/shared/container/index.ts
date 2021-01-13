import { container } from 'tsyringe';

import './providers';

import CashHandlingRepository from '@modules/cash_handling/infra/typeorm/repositories/CashHandlingRepository';
import ICashHandlingRepository from '@modules/cash_handling/repositories/ICashHandlingRepository';
import InspectionsRepository from '@modules/inspections/infra/typeorm/repositories/InspectionsRepository';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';

container.registerSingleton<IInspectionsRepository>(
  'InspectionsRepository',
  InspectionsRepository,
);

container.registerSingleton<ICashHandlingRepository>(
  'CashHandlingRepository',
  CashHandlingRepository,
);
