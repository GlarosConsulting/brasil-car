import { Router } from 'express';

import inspectionsRouter from '@modules/inspections/infra/http/routes/inspections.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/inspections', inspectionsRouter);

routes.get('/', (_request, response) =>
  response.json({
    name: 'Brasil Car API',
    version: '1.0.0',
  }),
);

export default routes;
