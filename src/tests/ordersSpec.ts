import { ordersClass, orders } from '../models/orders.model';
import app from '../server';
import envinfo from '../../envinfo';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';

const order = new ordersClass();

describe('orders model tests', () => {
  it('expect the retrieveOrdersByCustomerID function to be defined', () => {
    expect(order.retrieveOrdersByCustomerID).toBeDefined();
  });
  it('expect the retrieveOrdersByCustomerID_Status function to be defined', () => {
    expect(order.retrieveOrdersByCustomerID_Status).toBeDefined();
  });
  it('expect the addOrder function to be defined', () => {
    expect(order.addOrder).toBeDefined();
  });
});

describe('Testing orders endpoints', () => {
  it('test retrieveOrdersByCustomerID returns product quantity is greater than 5000 and order status is complete', async () => {
    await order.retrieveOrdersByCustomerID(1).then((data) => {
      const row = Object.values(data)[0];
      type objectkey = keyof typeof row;
      const productQuantityKey = 'product_quantity' as objectkey;
      const orderStatusKey = 'order_status' as objectkey;
      expect(row[productQuantityKey]).toBeGreaterThan(5000);
      expect(row[orderStatusKey]).toEqual('complete');
    });
  });
  it('test retrieveOrdersByCustomerID_Status returns product quantity is equal to 500 and customer id is 2', async () => {
    const oneOrder = {
      customerID: 2,
      orderStatus: 'complete',
    } as orders;
    await order.retrieveOrdersByCustomerID_Status(oneOrder).then((data) => {
      const row = Object.values(data)[0];
      type objectkey = keyof typeof row;
      const productQuantityKey = 'product_quantity' as objectkey;
      const customerIdKey = 'customerid' as objectkey;
      expect(row[productQuantityKey]).toEqual(500);
      expect(row[customerIdKey]).toEqual(2);
    });
  });
});

const request = supertest(app);
//testing orders endpoints
describe('testing orders endpoints', () => {
  it(`testing retrieveOrdersByCustomerID expects product quantity equals to 5200
      and order status equal to complete`, async () => {
    const cust = {
      customerName: 'test150',
      customerEmail: 'test150@yahoo',
      customerPassword: '1234',
    };
    const token = jwt.sign(cust, String(envinfo.token));
    const res = await request
      .get('/orders/1')
      .set('content-type', 'application/json')
      .set('authorization', token);
    expect(res.body.data[0].product_quantity).toEqual(5200);
    expect(res.body.data[0].order_status).toBe('complete');
  });
});
