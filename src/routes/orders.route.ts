import { Router } from 'express';
import * as handlers from '../handlers/orders.handler';
import tokenAuthenticate from '../middleWare/middleWare.token';

const ordersRouter = Router();

ordersRouter
  .route('/')
  .get(handlers.retrieveOrdersData)
  .post(handlers.addOrder);
ordersRouter
  .route('/customerstatus')
  .get(tokenAuthenticate, handlers.retrieveOrdersByCustomerID_Status);
ordersRouter
  .route('/:id')
  .patch(handlers.updateOrder)
  .delete(handlers.deleteOrder)
  .get(tokenAuthenticate, handlers.retrieveOrdersByCustomerID);

export default ordersRouter;
