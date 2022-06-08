import supertest from 'supertest';
import { dashboardClass } from '../services/dashboard';
import app from '../server';


const dash = new dashboardClass();

const request = supertest(app);

describe('Testing dashboard defined functions', () => {
  it('testing addDashboard function if defined', () => {
    expect(dash.addDashboard).toBeDefined();
  });
  it('testing retrieveCutomerOrdersProducts function if defined', () => {
    expect(dash.retrieveCutomerOrdersProducts).toBeDefined();
  });
});



describe('Testing dashboard endpoint functions', () => {
  it(`testing addDashboard function expects product_id to equal to 3
        and order_id to equal to 1 and status is 200`, async () => {
    
    const result = await request
      .post('/dashboard')
      .set('Content-type', 'application/json')
      .send({
        product_id: 3,
        order_id: 1,
      });
    expect(result.body.data.product_id).toEqual(3);
    expect(result.body.data.order_id).toEqual(1);
    expect(result.status).toEqual(200);
  });


  it(`testing retrieveCutomerOrdersProducts function expects 
        customername to equal to test1 and status is 200`, async () => {
    const result = await request
      .get('/dashboard')
    const customerName = await result.body.data[0].customername;
    expect(customerName).toEqual('test1');
    expect(result.status).toEqual(200);
  });
});
