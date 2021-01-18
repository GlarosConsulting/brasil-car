import { container } from 'tsyringe';

import './providers';

import CashHandlingRepository from '@modules/cash_handling/infra/typeorm/repositories/CashHandlingRepository';
import ICashHandlingRepository from '@modules/cash_handling/repositories/ICashHandlingRepository';
import InspectionsRepository from '@modules/inspections/infra/typeorm/repositories/InspectionsRepository';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';
import ReturnFilesRepository from '@modules/return_files/infra/typeorm/repositories/ReturnFilesRepository';
import IReturnFilesRepository from '@modules/return_files/repositories/IReturnFilesRepository';

container.registerSingleton<IInspectionsRepository>(
  'InspectionsRepository',
  InspectionsRepository,
);

container.registerSingleton<ICashHandlingRepository>(
  'CashHandlingRepository',
  CashHandlingRepository,
);

container.registerSingleton<IReturnFilesRepository>(
  'ReturnFilesRepository',
  ReturnFilesRepository,
);
