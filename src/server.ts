import express from 'express';
import customerRouter from './routes/customer.route';
import ordersRouter from './routes/orders.route';
import productsRouter from './routes/products.route';
import dashboardRouter from './routes/dashboard.route';
import bodyParser from 'body-parser';

const port = 3000;
const app = express();
app.use(bodyParser.json());

app.use('/customer', customerRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/dashboard', dashboardRouter);

app.listen(port, (): void => {
  console.log(`server is running on http://localhost:${port}`);
});

export default app;
