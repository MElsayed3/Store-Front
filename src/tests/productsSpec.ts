import { productsClass, Products } from '../models/products.model';
import supertest from 'supertest';
import app from '../server';
import envinfo from '../../envinfo';
import jwt from 'jsonwebtoken';

const product = new productsClass();
describe('products model tests', () => {
  it('expect the retrieveProductsData function to be defined', () => {
    expect(product.retrieveProductsData).toBeDefined();
  });
  it('expect the retrieveOneProduct function to be defined', () => {
    expect(product.retrieveOneProduct).toBeDefined();
  });
  it('expect the addProduct function to be defined', () => {
    expect(product.addProduct).toBeDefined();
  });
  it('expect the retrieveTopPopularProducts function to be defined', () => {
    expect(product.retrieveTopPopularProducts).toBeDefined();
  });
});

const oneProduct = {
  productName: 'testProduct4',
  productQuantity: 40000,
  productPrice: 400,
  productCategory: 'catTest4',
} as Products;

describe('Testing products functions retrieveProductsData retrieveOneProduct', () => {
  // it('test addProduct expects to return product name testProduct4', async () => {
  //   await product.addProduct(oneProduct).then((data) => {
  //     expect(data[0]).toEqual(oneProduct.productName);
  //   });
  // });
  it(`test retrieveProductsData expects 
      the product category of the first row to return cat4`, async () => {
    await product.retrieveProductsData().then((data) => {
      const firstRow = Object.values(data)[0];
      type objectKey = keyof typeof firstRow;
      const productCatKey = 'product_category' as objectKey;
      expect(firstRow[productCatKey]).toEqual('cat1');
    });
  });
  it('test retrieveOneProduct expects the product quantity to be equal to 30000', async () => {
    await product.retrieveOneProduct(3).then((data) => {
      const row = Object.values(data as object);
      expect(row[2]).toEqual(30000);
    });
  });
});

const request = supertest(app);
let token = '';

//testing products endpoints
describe('Testing products endpoints', () => {
  it(`testing addProduct expects status to equal to 200
      and message equals to product was added successflly`, async () => {
    const cust = {
      customerName: 'test150',
      customerEmail: 'test150@yahoo',
      customerPassword: '1234',
    };
    token = jwt.sign(cust, String(envinfo.token));
    const res = await request
      .post('/products')
      .set('Content-type', 'application/json')
      .set('Authorization', token)
      .send(oneProduct);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('product was added successflly');
  });
  it(`testing retrieveProductsData expects 
    the productname to equal to testProduct4`, async () => {
    const res = await request
      .get('/products/4')
      .set('Content-type', 'application/json')
      .set('Authorization', token);
    expect(res.body.data.productname).toEqual('testProduct4');
  });
  it(`testing retrieveProductsData expects the status 
    to be 200 and the first product name to be product1`, async () => {
    const res = await request
      .get('/products')
      .set('Content-type', 'application/json')
      .set('Authorization', token);
    expect(res.body.data[0].productname).toEqual('product1');
    expect(res.status).toBe(200);
  });
});
