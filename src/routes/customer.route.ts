import { Router } from 'express';
import * as handlers from '../handlers/customer.handler';
import tokenAuthenticate from '../middleWare/middleWare.token';

const customerRouter = Router();
// customerRouter.route('/').get(middleToken);
customerRouter
  .route('/')
  .get(tokenAuthenticate, handlers.retrieveCustomerData)
  .post(handlers.createCustomer);
customerRouter
  .route('/:id')
  .patch(handlers.updateCustomer)
  .delete(handlers.deleteCustomer)
  .get(tokenAuthenticate, handlers.retrieveOneCustomer);

customerRouter.route('/auth').post(tokenAuthenticate, handlers.authenticate);

export default customerRouter;
