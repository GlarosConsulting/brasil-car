import { Router } from 'express';

import cashHandlingRouter from '@modules/cash_handling/infra/http/routes/cash_handling.routes';
import inspectionsRouter from '@modules/inspections/infra/http/routes/inspections.routes';

const routes = Router();

routes.use('/inspections', inspectionsRouter);
routes.use('/cash-handling', cashHandlingRouter);

routes.get('/', (_request, response) =>
  response.json({
    name: 'Brasil Car API',
    version: '1.0.0',
  }),
);

export default routes;
