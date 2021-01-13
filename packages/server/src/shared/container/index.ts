import { container } from 'tsyringe';

import '@modules/users/providers';

import './providers';

import InspectionsRepository from '@modules/inspections/infra/typeorm/repositories/InspectionsRepository';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
