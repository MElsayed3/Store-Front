import { Customer, CustomerClass } from '../models/customer.model';
import app from '../server';
import supertest from 'supertest';

const customer = new CustomerClass();

describe('customer model tests', () => {
  it('expect the createCustomer function to be defined', () => {
    expect(customer.createCustomer).toBeDefined();
  });
  it('expect the retrieveCustomerData function to be defined', () => {
    expect(customer.retrieveCustomerData).toBeDefined();
  });
  it('expect the retrieveOneCustomer function to be defined', () => {
    expect(customer.retrieveOneCustomer).toBeDefined();
  });
});

const cust = {
  customerName: 'test150',
  customerEmail: 'test150@yahoo',
  customerPassword: '1234',
} as Customer;

describe('Testing customer functions createCustomer, authenticate, retrieveCustomerData retrieveOneCustomer', () => {
  it('Testing createCustomer returns customerEmail test150@yahoo', async () => {
    await customer.createCustomer(cust).then((data) => {
      expect(data[1]).toBe(cust.customerEmail);
    });
  });

  it('expects customer email to equal test150@yahoo', async () => {
    await customer.authenticate('test150@yahoo', '1234').then((data) => {
      const email = Object.values(data as object)[0];
      expect(email).toBe('test150@yahoo');
    });
  });

  it('expect a value of first row from retrieveCustomerData to be 1,test1,test1@yahoo,1234', async () => {
    await customer.retrieveCustomerData().then((data) => {
      const firstRow = Object.values(data[0] as object);
      expect(firstRow).toEqual([1, 'test1', 'test1@yahoo', '1234']);
    });
  });

  it('expect to return customer name test1 from retrieveOneCustomer function', async () => {
    await customer.retrieveOneCustomer(1).then((mydata) => {
      const row = Object.values(mydata);
      expect(row[1]).toEqual('test1');
    });
  });
});

const request = supertest(app);
let tokenStr = '';

//testing endpoints
describe('Testing customer endpoints', () => {
  it('testing createCustomer endpoint function expects status to equal to 200', async () => {
    const result = await request
      .post('/customer')
      .set('Content-type', 'application/json')
      .set('Authorization', tokenStr)
      .send(cust);

    tokenStr = await result.body.token;
    expect(result.status).toEqual(200);
  });
  it(`testing authenticate endpoint 
        function expects to return customerEmail test150@yahoo`, async () => {
    const result = await request
      .post('/customer/auth')
      .set('Content-type', 'application/json')
      .set('Authorization', tokenStr)
      .send(cust);
    expect(result.status).toEqual(201);
    expect(result.body.data.customerEmail).toEqual(cust.customerEmail);
  });
  it(`testing retrieveCustomerData endpoint function 
        expects the message equals to Data was retrieved 
        successfully and customeremail equals to test1@yahoo`, async () => {
    const result = await request
      .get('/customer')
      .set('Content-type', 'application/json')
      .set('Authorization', tokenStr);
    expect(result.body.message).toEqual('Data was retrieved successfully');
    expect(result.body.data[0].customeremail).toEqual('test1@yahoo');
  });
  it(`testing retrieveOneCustomer endpoint function 
        expects the email to equal to test150@yahoo and the status to equal to 201`, async () => {
    const res = await request
      .get('/customer/4')
      .set('Content-type', 'application/json')
      .set('Authorization', tokenStr);
    expect(res.status).toEqual(200);
    expect(res.body.data.customeremail).toEqual(cust.customerEmail);
  });
});
