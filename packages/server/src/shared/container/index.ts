import { container } from 'tsyringe';

import './providers';

import CashHandlingRepository from '@modules/cash_handling/infra/typeorm/repositories/CashHandlingRepository';
import ICashHandlingRepository from '@modules/cash_handling/repositories/ICashHandlingRepository';
import BreakdownsRepository from '@modules/inspections/infra/typeorm/repositories/BreakdownsRepository';
import InspectionGlassRepository from '@modules/inspections/infra/typeorm/repositories/InspectionGlassRepository';
import InspectionsRepository from '@modules/inspections/infra/typeorm/repositories/InspectionsRepository';
import IBreakdownsRepository from '@modules/inspections/repositories/IBreakdownsRepository';
import IInspectionGlassRepository from '@modules/inspections/repositories/IInspectionGlassRepository';
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

container.registerSingleton<IBreakdownsRepository>(
  'BreakdownsRepository',
  BreakdownsRepository,
);

container.registerSingleton<IInspectionGlassRepository>(
  'InspectionGlassRepository',
  InspectionGlassRepository,
);
