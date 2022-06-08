"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_model_1 = require("../models/products.model");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const envinfo_1 = __importDefault(require("../../envinfo"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product = new products_model_1.productsClass();
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
};
describe('Testing products functions retrieveProductsData retrieveOneProduct', () => {
    // it('test addProduct expects to return product name testProduct4', async () => {
    //   await product.addProduct(oneProduct).then((data) => {
    //     expect(data[0]).toEqual(oneProduct.productName);
    //   });
    // });
    it(`test retrieveProductsData expects 
      the product category of the first row to return cat4`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield product.retrieveProductsData().then((data) => {
            const firstRow = Object.values(data)[0];
            const productCatKey = 'product_category';
            expect(firstRow[productCatKey]).toEqual('cat1');
        });
    }));
    it('test retrieveOneProduct expects the product quantity to be equal to 30000', () => __awaiter(void 0, void 0, void 0, function* () {
        yield product.retrieveOneProduct(3).then((data) => {
            const row = Object.values(data);
            expect(row[2]).toEqual(30000);
        });
    }));
});
const request = (0, supertest_1.default)(server_1.default);
let token = '';
//testing products endpoints
describe('Testing products endpoints', () => {
    it(`testing addProduct expects status to equal to 200
      and message equals to product was added successflly`, () => __awaiter(void 0, void 0, void 0, function* () {
        const cust = {
            customerName: 'test150',
            customerEmail: 'test150@yahoo',
            customerPassword: '1234',
        };
        token = jsonwebtoken_1.default.sign(cust, String(envinfo_1.default.token));
        const res = yield request
            .post('/products')
            .set('Content-type', 'application/json')
            .set('Authorization', token)
            .send(oneProduct);
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('product was added successflly');
    }));
    it(`testing retrieveProductsData expects 
    the productname to equal to testProduct4`, () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get('/products/4')
            .set('Content-type', 'application/json')
            .set('Authorization', token);
        expect(res.body.data.productname).toEqual('testProduct4');
    }));
    it(`testing retrieveProductsData expects the status 
    to be 200 and the first product name to be product1`, () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get('/products')
            .set('Content-type', 'application/json')
            .set('Authorization', token);
        expect(res.body.data[0].productname).toEqual('product1');
        expect(res.status).toBe(200);
    }));
});
