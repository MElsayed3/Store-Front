import { Router } from 'express';
import * as handlers from '../handlers/products.handler';
import tokenAuthenticate from '../middleWare/middleWare.token';

const productsRouter = Router();

productsRouter
  .route('/')
  .get(handlers.retrieveProductsData)
  .post(tokenAuthenticate, handlers.addProduct);
productsRouter.route('/top_product').get(handlers.retrieveTopPopularProducts);
productsRouter
  .route('/:id')
  .patch(handlers.updateProduct)
  .delete(handlers.deleteProduct)
  .get(handlers.retrieveOneProduct);

export default productsRouter;
