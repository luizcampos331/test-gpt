import { Router } from 'express';
import textRouter from '@infra/http/routes/text.routes'

const routes = Router();

routes.use('/text', textRouter);

routes.get('/', (request, response) => {
  return response.send('API SeTatue - 1.0.0');
});

export default routes;
